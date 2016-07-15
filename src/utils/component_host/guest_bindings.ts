import {List,Map} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {Injectable} from '@angular/core';
import * as ast from '@angular/compiler/src/expression_parser/ast';
import {Parser} from '@angular/compiler/src/expression_parser/parser';


import {forEachOwnProperty, isFunction, isDefined} from 'caesium-core/lang';
import {ArgumentError, StateException} from 'caesium-model/exceptions';
import {memoize} from 'caesium-core/decorators';

export type BindingMap = {[binding: string]: string};

@Injectable()
export class GuestBindingsFactory {
    constructor(private parser: Parser) { }

    getBindings(bindingMap: BindingMap) {
        var inputs: any = {};
        var outputs: any= {};
        forEachOwnProperty(bindingMap, (value, key) => {
            var match = key.match(InputBinding.PATTERN);
            if (match) {
                let propName = match[1];
                if (propName.startsWith('('))
                    throw new ArgumentError('Guest component bindings cannot contain \[\(groups\)\]');
                inputs[propName] = this.parseInputBinding(value);
                return;
            }
            var match = key.match(OutputBinding.PATTERN);
            if (match) {
                let propName = match[1];
                outputs[propName] = this.parseOutputBinding(value);
                return;
            }
            throw 'Invalid binding: \'' + key + '\'';
        });
        return new GuestBindings(
            Map<string,InputBinding>(inputs),
            Map<string,OutputBinding>(outputs)
        );
    }

    private parseInputBinding(expression: string) {
        return new InputBinding(this.parser.parseSimpleBinding(expression, ''));
    }

    private parseOutputBinding(expression: string) {
        var action = this.parser.parseAction(expression, '');
        var exprCheck = new CheckSimpleEventAction();
        if (!exprCheck.check(action)) {
            throw new ArgumentError(
                'Only simple output property actions (function calls and property writes) ' +
                'are supported in dynamic component bindings'
            );
        }
        return new OutputBinding(action);
    }
}

export class GuestBindings {
    constructor(
        public inputs: Map<string, InputBinding>,
        public outputs: Map<string,OutputBinding>
    ) { }

    getInputBinding(propName: string) {
        return this.inputs.get(propName, void 0);
    }

    getOutputBinding(propName: string) {
        return this.outputs.get(propName, void 0);
    }
}

class InputBinding {
    static PATTERN = /^\[(.*)\]$/;

    constructor(public inputAst:ast.AST) {}

    getBindingValue(componentInstance: any) {
        var propertyAccessor = new PropertyAccessor(this.inputAst);
        return propertyAccessor.get(componentInstance);
    }

}

export type EventSubscriber = (observable: Observable<any>) => Subscription;

class OutputBinding {
    static PATTERN = /^\((.*)\)$/;

    constructor(public expression:ast.AST) {}

    eventListener(instance: any): EventSubscriber {
        var listener = new SimpleEventListener(instance, this.expression);
        return (observable) => {
            return observable.subscribe((evt) => listener.handle(evt));
        }
    }
}

class SimpleEventListener implements ast.AstVisitor {
    constructor(
        public instance: any,
        public actionAst: ast.AST
    ) { }

    handle(event: any): any {
        this.actionAst.visit(this, event);
    }

    visitMethodCall(ast:ast.MethodCall, context:any):any {
        let funcAccessor = new PropertyAccessor(ast.receiver);
        let func = funcAccessor.get(this.instance)[ast.name];

        if (!isFunction(func))
            throw new StateException('Not a function: ' + func.name);

        var argValues = ast.args.map((arg) => this._getArgValue(arg, context));
        func.call(this.instance, argValues);
    }

    visitPropertyWrite(ast: ast.PropertyWrite, context: any): any {
        var propAccessor = new PropertyAccessor(ast.receiver);
        var obj = propAccessor.get(this.instance);

        obj[ast.name] = this._getArgValue(ast.value, context);
    }

    visitKeyedWrite(ast:ast.KeyedWrite, context:any):any {
        var propAccessor = new PropertyAccessor(ast.obj);
        var obj = propAccessor.get(this.instance);

        // Already checked that only literal string/int keys allowed
        var keyAccessor = new PropertyAccessor(ast.key);
        var key = keyAccessor.get(null);

        obj[key] = this._getArgValue(ast.value, context);
    }

    private _getArgValue(arg: ast.AST, context: any): any {
        if (arg instanceof ast.PropertyRead && arg.name === '$event') {
            return context;
        } else if (arg instanceof ast.LiteralPrimitive) {
            var propAccessor = new PropertyAccessor(arg);
            return propAccessor.get(null);
        }
        throw new StateException(
            'A guest binding argument must be either \'$event\' or a literal primitive value'
        );
    }

    visitImplicitReceiver(ast: ast.ImplicitReceiver, context: any): any {}
    visitBinary(ast:ast.Binary, context:any):any {}
    visitChain(ast:ast.Chain, context:any):any {}
    visitConditional(ast:ast.Conditional, context:any):any {}
    visitFunctionCall(ast:ast.FunctionCall, context:any):any {}
    visitPipe(ast:ast.BindingPipe, context:any):any {}
    visitInterpolation(ast:ast.Interpolation, context:any):any {}
    visitKeyedRead(ast:ast.KeyedRead, context:any):any {}
    visitLiteralArray(ast:ast.LiteralArray, context:any):any {}
    visitLiteralMap(ast:ast.LiteralMap, context:any):any {}
    visitLiteralPrimitive(ast:ast.LiteralPrimitive, context:any):any {}
    visitPrefixNot(ast:ast.PrefixNot, context:any):any {}
    visitPropertyRead(ast:ast.PropertyRead, context:any):any {}
    visitQuote(ast:ast.Quote, context:any):any {}
    visitSafeMethodCall(ast:ast.SafeMethodCall, context:any):any {}
    visitSafePropertyRead(ast:ast.SafePropertyRead, context:any):any {}
}

class PropertyAccessor extends ast.RecursiveAstVisitor {
    constructor(private accessorAst: ast.AST) {
        super();
    }

    get(instance: any) {
        return this.accessorAst.visit(this, instance);
    }

    visitImplicitReceiver(ast: ast.ImplicitReceiver, context: any) {
        return context;
    }

    visitLiteralArray(ast: ast.LiteralArray, context: any): any {
        var list = <any[]>[];
        ast.expressions.forEach(expression => {
            var item = expression.visit(this, null);
            list.push(item);
        });
        return list;
    }

    visitLiteralMap(ast: ast.LiteralMap, context: any): any {
        var map: any = {};
        for (let i=0;i<ast.keys.length;i++) {
            let k = ast.keys[i].visit(this, context);
            map[k] = ast.values[i].visit(this, context);
        }
        return map;
    }

    visitLiteralPrimitive(ast: ast.LiteralPrimitive, context: any) {
        return ast.value;
    }

    visitPropertyRead(ast: ast.PropertyRead, context: any): any {
        context = ast.receiver.visit(this, context);
        return context[ast.name];
    }
}

export class CheckSimpleEventAction implements ast.AstVisitor {

    simple = true;

    check(expression: ast.AST): boolean {
        expression.visit(this, null);
        return this.simple;
    }

    visitImplicitReceiver(ast:ast.ImplicitReceiver, context:any):any {}

    visitMethodCall(ast:ast.MethodCall, context:any):any {
        this._checkSimpleArgs(ast.args);
    }
    visitLiteralPrimitive(ast:ast.LiteralPrimitive, context:any):void {}

    visitPropertyRead(ast:ast.PropertyRead, context:any): void{
        console.log('property read', ast);
        ast.receiver.visit(this, context);
    }

    visitPropertyWrite(ast:ast.PropertyWrite, context:any):void {
        ast.receiver.visit(this, context);
        ast.value.visit(this, context);
    }
    visitKeyedWrite(write:ast.KeyedWrite, context:any):void {
        if (write.key instanceof ast.LiteralPrimitive) {
            write.obj.visit(this, context);
            write.value.visit(this, context);
        } else {
            this.simple = false;
        }
    }

    visitAll(expressions:ast.AST[], context:any): any {
        for (let expr of expressions) {
            expr.visit(this, context);
        }
        return null;
    }

    private _checkSimpleArgs(args: any[]): void {
        for (let arg of args) {
            if ((arg instanceof ast.PropertyRead) && arg.name === '$event') {
                continue;
            } else if (arg instanceof ast.LiteralPrimitive) {
                continue;
            }
            this.simple = false;
        }
    }

    visitFunctionCall(ast:ast.FunctionCall, context:any):any {
        this.simple = false;
    }

    visitLiteralArray(ast:ast.LiteralArray, context:any):any {
        this.simple = false;
    }

    visitLiteralMap(ast:ast.LiteralMap, context:any):any {
        this.simple = false;
    }

    visitInterpolation(ast:ast.Interpolation, context:any):any {
        this.simple = false;
    }

    visitKeyedRead(ast:ast.KeyedRead, context:any):any {
        this.simple = false;
    }

    visitPipe(ast:ast.BindingPipe, context:any):any {
        this.simple = false;
    }

    visitPrefixNot(ast:ast.PrefixNot, context:any):any {
        this.simple = false;
    }

    visitQuote(ast:ast.Quote, context:any):any {
        this.simple = false;
    }

    visitSafeMethodCall(ast:ast.SafeMethodCall, context:any):any {
        this.simple = false;
    }

    visitSafePropertyRead(ast:ast.SafePropertyRead, context:any):any {
        this.simple = false;
    }

    visitBinary(ast:ast.Binary, context:any):any {
        this.simple = false;
    }

    visitChain(ast:ast.Chain, context:any):any {
        this.simple = false;
    }

    visitConditional(ast:ast.Conditional, context:any):any {
        this.simple = false;
    }
}




