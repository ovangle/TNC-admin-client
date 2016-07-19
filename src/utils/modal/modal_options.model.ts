import {Type} from 'caesium-core/lang';
import {RemoteComponent} from '../component_host';

/// Bindings for the body are specified the same as 'host' bindings on the
/// @Component decorator
export type BindingMap = {[binding: string]: string};

export interface ModalOptions {
    // If the modal is non-blocking, clicking outside the element
    // will complete the dismiss the modal.
    // Default is `false`
    isBlocking?: boolean;

    /// The type of the component to be used as the body of the
    /// Must be added as a directive on the host component
    body: Type;

    /// Bindings for the modal body
    bindings?: BindingMap;

    remote: RemoteComponent;
}

/*
export const DEFAULT_MODAL_OPTIONS: ModalOptions = {
    isBlocking: false,
    rejectKeycodes: Set<number>([27]),
    confirmKeycodes: Set<number>([13]),
    showClose: true
};
*/

