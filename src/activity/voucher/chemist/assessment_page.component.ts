import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';

import {Component} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';

import {isBlank} from 'caesium-core/lang';

import {MemberContext} from 'member';

import {VoucherAssessmentStatus, voucherAssessmentStatus} from '../assessment/status';

import {VoucherManager} from '../voucher.manager';
import {ChemistVoucher, chemistVoucher} from './chemist_voucher.model';

@Component({
    selector: 'chemist-voucher-assessment-page',
    template: `
    <ng-container [ngSwitch]="assessmentStatus">
        <voucher-assessment-submission-dialog *ngSwitchCase="'assessing'"
                [voucher]="voucher"
                (submit)="save()">
            <h4 title>Issue Chemist Voucher</h4>
            <chemist-voucher-assessment
                assessment
                [member]="memberContext.member | async"
                [voucher]="voucher"
                (voucherChange)="voucher = $event">
            </chemist-voucher-assessment>
        </voucher-assessment-submission-dialog>     
        
        <voucher-assessment-accepted-dialog *ngSwitchCase="'approved'">
            <h4 #title>Chemist voucher approved</h4> 
        </voucher-assessment-accepted-dialog>
        
        <voucher-assessment-rejected-dialog *ngSwitchCase="'rejected'">
            <h4 #title>Chemist voucher rejected</h4> 
        </voucher-assessment-rejected-dialog>
    </ng-container>
    `
})
export class ChemistVoucherAssessmentPage {
    private voucher: ChemistVoucher;
    private errResponse: HttpResponse;

    constructor(
        private memberContext: MemberContext,
        private voucherManager: VoucherManager
    ) {}

    get assessmentStatus(): VoucherAssessmentStatus {
        return voucherAssessmentStatus(this.voucher, this.errResponse);
    }


    ngOnInit() {
        this.voucher = chemistVoucher({});

        let member$ = this.memberContext.member.first();
        member$.switchMap(member => {
            return this.voucher.calcVouchersInFinancialYear(this.voucherManager, member)
        }).do(updatedVoucher => {
            this.voucher = <ChemistVoucher>updatedVoucher;
        });
    }

    save(): void {
        this.memberContext.member.first().switchMap(member => {
           debugger;
           return this.voucherManager.save(member, this.voucher)
               .do(voucher => {
                   this.voucher = voucher;
               })
               .catch((response: HttpResponse) => {
                   this.errResponse = response;
                   return Observable.of(null);
               });
        }).forEach(voucher => {
            console.log('voucher submitted', voucher);
        })
    }
}
