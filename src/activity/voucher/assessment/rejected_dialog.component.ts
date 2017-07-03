import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';

import {Modal} from 'utils/modal';

@Component({
    selector: 'voucher-assessment-rejected-dialog',
    template: `
    <div class="modal-content"> 
        <div class="modal-header">
            <ng-content select="#title"></ng-content> 
        </div> 
        <div class="modal-body">
            The server failed to process the request and responded
            with an error.
            
            
            <i>Status</i> {{errResponse.status}}
            <i>Body</i> {{errResponse.body | json }} 
        </div>
        <div class="modal-footer layout horizontal">
            <button (click)="resubmit.emit(null)">Review and resubmit</button>
            <button (click)="close()">Close</button>
        </div>
    </div>
    `
})
export class VoucherAssessmentRejectedDialog {
    @Input() errResponse: HttpResponse;

    @Output() resubmit = new EventEmitter<any>();

    constructor(private modal: Modal) {}

    close() {
        this.modal.close();
    }



}

