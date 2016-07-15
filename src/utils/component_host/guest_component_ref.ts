import {Subscription} from 'rxjs/Subscription';

import {ComponentRef, ElementRef, ChangeDetectorRef} from '@angular/core';

import {Type} from 'caesium-core/lang';

import {RemoteComponent} from './remote_component_ref';

/**
 * A GuestComponent lives inside another component view as a child of
 * a ComponentHost.
 *
 * The guest component is not a child of the hosted component and input
 * and output properties of the guest are bound to a [Remote]
 */
export abstract class GuestComponentRef<C> {
    component: ComponentRef<C>;

    /// The location in the host view containing the guest
    location: ElementRef;

    /// The type of the hosted component
    componentType: Type /*<C>*/;

    /// The instance of the hosted component
    instance: C;

    /// The remote component instance.
    remote: RemoteComponent;

    changeDetectorRef: ChangeDetectorRef;

    abstract destroy(): void;
    abstract onDestroy(fn: (_: any) => void): void;
}

export class _GuestComponentRef<C> implements GuestComponentRef<C> {
    private _onDestroy: Function;

    constructor(
        private _component: ComponentRef<C>,
        private _remote: RemoteComponent
    ) { }

    get component(): ComponentRef<C> { return this._component; }

    get location(): ElementRef { return this._component.location; }
    get componentType(): Type { return this._component.componentType; }
    get instance(): C { return this._component.instance; }
    get changeDetectorRef(): ChangeDetectorRef {
        return this._component.changeDetectorRef;
    }

    get remote(): RemoteComponent { return this._remote; }

    destroy() {
        this._onDestroy();
        this.component.destroy();
    }

    onDestroy(fn: () => void) {
        this._onDestroy = fn;

    }

}


