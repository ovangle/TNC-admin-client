import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

import {isDefined} from 'caesium-core/lang';
import {ArgumentError} from 'caesium-model/exceptions';
import {ModalDialog} from './modal_dialog.model';
import {ModalDialogComponent} from "./modal_dialog.component";

@Injectable()
export class ModalDialogService {

    dialogChange: Subject<ModalDialog>;
    dialogComponent: ModalDialogComponent;

    constructor() {
        this.dialogChange = new Subject<ModalDialog>();
    }

    activate(modalDialog: ModalDialog): Promise<any> {
        this.dialogChange.next(modalDialog);
        return this.dialogComponent.dismiss.first().toPromise();
    }

    registerModalDialog(modalDialogComponent: ModalDialogComponent) {
        if (isDefined(this.dialogComponent)) {
            throw new ArgumentError('Multiple dialog components not supported');
        }
        this.dialogComponent = modalDialogComponent;
    }
}
