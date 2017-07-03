import 'rxjs/add/operator/first';

import {
    Injectable, Type, ReflectiveInjector, Injector, InjectionToken
} from '@angular/core';

import {isDefined} from 'caesium-core/lang';
import {StateException} from 'caesium-json/exceptions';

import {ModalDialog} from './modal_dialog.component';

export interface ModalContext {
    [key: string]: any;
}
export const MODAL_CONTEXT = new InjectionToken('MODAL_CONTEXT');

@Injectable()
export class Modal {
    private _dialog: ModalDialog;

    constructor(private injector: Injector) {}

    registerDialogComponent(
        modalDialog: ModalDialog) {
        if (isDefined(this._dialog))
            _throwUniqueRegisteredDialogException();

        this._dialog = modalDialog;
    }

    /**
     * Open the modal-dialog, with the given component.
     *
     * The component must be in entryComponents for the module which defines it.
     * @param component
     * @param injector
     * @param context
     */
    open(component: Type<any>, injector?: Injector, context?: {[key: string]: any}) {
        if (!isDefined(this._dialog))
            _throwUniqueRegisteredDialogException();
        if (this._dialog.isOpen) {
            throw new StateException('Can only have one open dialog');
        }

        let modalInjector = ReflectiveInjector.resolveAndCreate([
            {provide: MODAL_CONTEXT, useValue: context}
        ], injector);

        this._dialog.open(component, modalInjector);
    }

    close() {
        if (!isDefined(this._dialog))
            _throwUniqueRegisteredDialogException();

        this._dialog.close();
    }
}

function _throwUniqueRegisteredDialogException() {
    throw new StateException(
        'Exactly one <modal-dialog> component must be present' +
        'in the view of the root application component'
    );
}

