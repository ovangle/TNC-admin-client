import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

import {
    Injectable, ReflectiveInjector, ComponentRef, ViewContainerRef,
    ComponentResolver, ApplicationRef, PlatformRef
} from '@angular/core';

import {isDefined, Type} from 'caesium-core/lang';
import {StateException} from 'caesium-model/exceptions';

import {ModalOptions, ModalState} from './modal_options.model';
import {ModalDialog} from './modal_dialog.component';



@Injectable()
export class Modal {
    private _dialog: ModalDialog;

    constructor() {}

    registerDialogComponent(
        modalDialog: ModalDialog) {
        if (isDefined(this._dialog))
            _throwUniqueRegisteredDialogException();

        this._dialog = modalDialog;
    }

    activate(options: ModalOptions): Promise<ModalState> {
        if (!isDefined(this._dialog))
            _throwUniqueRegisteredDialogException();
        if (this._dialog.open) {
            throw new StateException('Can only have one open dialog');
        }

        this._dialog.options = options;
        this._dialog.markForCheck();
        return this._dialog.stateChange.first().toPromise();
    }
}

function _throwUniqueRegisteredDialogException() {
    throw new StateException(
        'Exactly one <modal-dialog> component must be present' +
        'in the view of the root application component'
    );
}

