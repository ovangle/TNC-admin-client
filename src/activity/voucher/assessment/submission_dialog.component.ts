import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Modal} from 'utils/modal';
import {Voucher} from '../voucher.model';

@Component({
    selector: 'voucher-assessment-submission-dialog',
    template: `
    <div class="modal-content">
        <div class="modal-header">
            <ng-content select="[title]"></ng-content> 
        </div>
        
        <div class="modal-body">
            <ng-content select="[assessment]"></ng-content> 
        </div>
        
        <div class="modal-footer layout horizontal">
            <div class="btn-group">
                <button  
                    class="btn btn-primary"
                    (click)="submit.emit(true)" [disabled]="!voucher.isValid">
                    <i class="fa fa-save"></i> Submit
                </button>
                <button
                    class="btn btn-default"
                    (click)="cancel()">
                    <i class="fa fa-close"></i> Cancel
                </button>
            </div>
            <div class="flex">
                <div class="value-container">
                    <strong class="text-muted">Assessed value:</strong> {{voucher.getValue() | money}}
                </div> 
                
                <div *ngIf="voucher.isValid; else voucherInvalid" class="text-success">
                    <strong>
                        <i class="fa fa-check"></i>&ensp;
                        The assessment is valid
                    </strong>
                </div>
                
                <ng-template #voucherInvalid class="has-error">
                    <div class="text-danger">
                        <strong>
                            <i class="fa fa-warning"></i>&ensp;
                            The assessment has errors and cannot be submitted 
                        </strong>      
                    </div>
                </ng-template>
            </div> 
        </div>
    </div>
    `
})
export class VoucherAssessmentSubmissionDialog {
    @Input() voucher: Voucher;
    @Output() submit = new EventEmitter<any>();

    constructor(private modal: Modal) {}

    cancel() {
        this.modal.close();
    }
}
