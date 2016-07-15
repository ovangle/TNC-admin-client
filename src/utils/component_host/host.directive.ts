import {Directive, Input, OnInit, OnDestroy, ElementRef} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {BindingMap} from './guest_bindings';
import {GuestComponentLoader} from './loader.service';
import {GuestComponentRef} from './guest_component_ref';
import {RemoteComponent} from './remote_component_ref';

@Directive({
    selector: 'div[csSource][csType], span[csSource][csType]',
})
export class ComponentHost<T> implements OnInit, OnDestroy {
    @Input('csSource') remote: RemoteComponent;
    @Input('csType') type: Type /*<T>*/;
    @Input('csBindings') bindings: BindingMap;

    private _content: GuestComponentRef<T>;

    get insertionNode(): Node {
        return this.elementRef.nativeElement;
    }

    constructor(
        private loader: GuestComponentLoader,
        private elementRef: ElementRef
    ) { }

    ngOnInit() {
        this.loader.loadComponent(this, this.remote, this.type, this.bindings).then((componentRef) => {
            this._content = componentRef;
        });
    }

    ngOnDestroy() {
        if (this._content) {
            this.loader.unloadComponent(this._content);
        }
    }
}
