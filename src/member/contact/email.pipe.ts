import {Pipe, PipeTransform} from 'angular2/core';
import {isString} from "angular2/src/facade/lang";
import {isBlank} from 'caesium-core/lang';

@Pipe({name: 'email'})
export class EmailPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        if (isString(value)) {
            return `<a href=mailto:${value}>${value}</a>`
        }
        throw new TypeError(`Expected a string: ${value}`);
    }
}
