import {Iterable, Set} from 'immutable';

import {Type} from 'caesium-core/lang';
import {RemoteComponent} from '../component_host';

export type ModalType = 'PROMPT' | 'CONFIRM';
export type ModalState = 'CONFIRM' | 'REJECT';

/// Bindings for the body are specified the same as 'host' bindings on the
/// @Component decorator
export type BindingMap = {[binding: string]: string};

export interface ModalOptions {
    /// The type of the dialog.
    /// 'PROMPT' is a dialog with a single 'OK' button,
    /// 'CONFIRM' is a dialog with 'OK' and 'Cancel' buttons,
    type: ModalType;

    // If the modal is non-blocking, clicking outside the element
    // will complete the dismiss the modal.
    // Default is `false`
    isBlocking?: boolean;

    /// Message to display in the title of the modal dialog.
    /// Will be wrapped in a `h3` heading
    title?: string;

    /// The type of the component to be used as the body of the
    /// Must be a resolvable component
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

