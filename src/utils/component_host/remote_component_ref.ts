import {ViewContainerRef} from '@angular/core';


/**
 * The remote component provides the bindings and dependencies
 * for the guest component.
 */
export interface RemoteComponent {
    // A reference to the view of the remote component
    // Used to obtain the injector
    view: ViewContainerRef;

    // A direct reference to the remote component instance
    instance: any;
}
