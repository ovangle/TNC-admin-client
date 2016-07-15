import {Subscribable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {
    Injectable, ApplicationRef, ComponentResolver, NgZone,
    ReflectiveInjector, SimpleChange, ResolvedReflectiveFactory
} from '@angular/core';

import {Type, isFunction, forEachOwnProperty, isDefined} from 'caesium-core/lang';
import {GuestComponentRef, _GuestComponentRef} from './guest_component_ref';
import {RemoteComponent} from './remote_component_ref';
import {GuestBindingsFactory, GuestBindings, BindingMap} from './guest_bindings';
import {ComponentHost} from './host.directive';

@Injectable()
export class GuestComponentLoader {
    constructor(
        private appRef: ApplicationRef,
        private componentResolver: ComponentResolver,
        private zone: NgZone,
        private bindingFactory: GuestBindingsFactory
    ) {}

    private _prepareComponent(component: any, remote: RemoteComponent, bindings: GuestBindings) {
        var _ngOnChanges = remote.instance.ngOnChanges;

        function onChanges(changes:{[prop:string]:SimpleChange}) {
            console.log('ngOnChanges', this);
            bindings.inputs.forEach((binding, propName) => {
                component[propName] = binding.getBindingValue(remote.instance);
            });

            if (isFunction(_ngOnChanges)) {
                _ngOnChanges.call(remote.instance, [changes]);
            }
        }
        remote.instance.ngOnChanges = onChanges.bind(remote.instance);

        // Provide initial values for the bindings
        bindings.inputs.forEach((binding, propName) => {
            component[propName] = binding.getBindingValue(remote.instance);
        });

        var outputSubscriptions = <Subscription[]>[];
        bindings.outputs.forEach((binding, propName) => {
            var observable = component[propName];
            if (isDefined(observable.subscribe)) {
                var listener = binding.eventListener(remote.instance);
                outputSubscriptions.push(listener(observable));
            }
        });
        return outputSubscriptions;
    }

    loadComponent<T>(host: ComponentHost<T>, remote: RemoteComponent, type: Type, bindings?: BindingMap): Promise<GuestComponentRef<T>> {
        let guestBindings = this.bindingFactory.getBindings(bindings || {});
        return this.componentResolver.resolveComponent(type).then(factory => {
            const injector = ReflectiveInjector.fromResolvedProviders([], remote.view.parentInjector);

            let component = factory.create(injector, [], host.insertionNode);
            let guestComponent = new _GuestComponentRef<T>(
                component,
                remote
            );

            let outputSubscriptions = this._prepareComponent(guestComponent.instance, remote, guestBindings);
            guestComponent.onDestroy(() => {
                outputSubscriptions.forEach(sub => {
                    if (!sub.isUnsubscribed) {
                        sub.unsubscribe();
                    }
                })
            });

            guestComponent.changeDetectorRef.markForCheck();
            (this.appRef as any)._loadComponent(guestComponent.component);
            return guestComponent
        });
    }

    unloadComponent<C>(component: GuestComponentRef<C>) {
        (this.appRef as any)._unloadComponent(component.component);
        component.destroy();
    }
}
