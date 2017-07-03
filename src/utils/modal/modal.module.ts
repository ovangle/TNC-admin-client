import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Modal} from './modal.service';
import {ModalDialog} from './modal_dialog.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalDialog
    ],
    providers: [
        Modal
    ],
    exports: [
        ModalDialog
    ]
})
export class ModalModule { }
