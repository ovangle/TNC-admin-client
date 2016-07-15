import {GuestComponentLoader} from './component_host/loader.service';
import {ComponentHost} from './component_host/host.directive';
import {GuestBindingsFactory} from './component_host/guest_bindings';
import {RemoteComponent} from './component_host/remote_component_ref';

export {ComponentHost} from './component_host/host.directive';
export {GuestComponentLoader} from './component_host/loader.service';
export {RemoteComponent} from './component_host/remote_component_ref';

export const COMPONENT_HOST_PROVIDERS = [
    GuestBindingsFactory,
    GuestComponentLoader
];

export const COMPONENT_HOST_DIRECTIVES = [
    ComponentHost
];

