import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';

import {Component} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';

import {Modal} from 'utils/modal';
import {MemberContext} from 'member';

import {VoucherAssessmentStatus, voucherAssessmentStatus} from '../assessment/status';
import {VoucherManager} from '../voucher.manager';

import {EAPAVoucher, eapaVoucher} from './eapa_voucher.model';

@Component({
    selector: 'eapa-voucher-assessment-page',
    template: `
    <style>
    .create-task-submit {
        position: fixed; 
        bottom: 10px;
        
        background-color: #ddd;
        padding: 15px;
    }
    .submit-button-container {
        margin-right: 30px;
    }
    </style>
    <ng-container [ngSwitch]="assessmentStatus">
        <voucher-assessment-submission-dialog *ngSwitchCase="'assessing'"
                [voucher]="voucher"
                (submit)="save()">
            <h4 title>Issue EAPA Voucher</h4>         
            <eapa-voucher-assessment
                [member]="memberContext.member | async"
                [voucher]="voucher"
                (voucherChange)="voucher = $event"
        </voucher-assessment-submission-dialog>
        
        <voucher-assessment-accepted-dialog *ngSwitchCase="'approved'"
                [voucher]="voucher">
            <h4 title>EAPA voucher approve</h4>
        </voucher-assessment-accepted-dialog> 
        
        <voucher-assessment-rejected-dialog *ngSwitchCase="'rejected'"
                [errResponse]="errResponse"
                (resubmit)="resubmit()">
            <h4 title>EAPA voucher rejected</h4>
        </voucher-assessment-rejected-dialog>
        
    </ng-container>
    `,
})
export class EAPAVoucherAssessmentPage {
    private voucher: EAPAVoucher;
    private errResponse: HttpResponse;

    constructor(
        private modal: Modal,
        private memberContext: MemberContext,
        private voucherManager: VoucherManager
    ) {}

    get assessmentStatus(): VoucherAssessmentStatus {
        return voucherAssessmentStatus(this.voucher, this.errResponse);
    }

    ngOnInit() {
        this.voucher = eapaVoucher({});
        let member$ = this.memberContext.member.first();
        member$.switchMap(member => {
            return this.voucher.calcVouchersInFinancialYear(this.voucherManager, member)
        }).do(updatedVoucher => {
            this.voucher = <EAPAVoucher>updatedVoucher;
        });
    }

    save(): Observable<EAPAVoucher> {
        return this.memberContext.member.first().switchMap(member => {
            return this.voucherManager.save(member, this.voucher)
                .do(voucher => {
                    this.voucher = voucher
                })
                .catch((response: HttpResponse) => {
                    this.errResponse = response;
                    return Observable.of(null);
                })
        });
    }

    resubmit() {
        this.errResponse = null;
    }
}
