import {Component, Input} from '@angular/core';

import {Modal} from 'utils/modal';
import {Voucher} from '../voucher.model';

@Component({
    selector: 'voucher-assessment-accepted-dialog',
    template: `
    <div class="modal-content">
        <div class="modal-header">
            <ng-content select=".header"></ng-content>
        </div>     
        <div class="modal-body">
            <p>Assessed value: {{voucher.value | money}}</p>
        </div> 
        <div class="modal-footer">
            <button (click)="dismissModal()">OK</button>
        </div>
    </div>
    `
})
export class VoucherAssessmentAcceptedDialog {
    @Input() voucher: Voucher;

    constructor(private modal: Modal) {}

    dismissModal() {
        this.modal.close();
    }

}
