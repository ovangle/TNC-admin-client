import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';

import {
    Component, ElementRef
} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';

import {MemberContext} from 'member';

import {VoucherManager} from '../voucher.manager';
import {FoodcareVoucher, foodcareVoucher} from './foodcare_voucher.model';
import {VoucherAssessmentStatus, voucherAssessmentStatus} from "../assessment/status";

@Component({
    selector: 'foodcare-voucher-assessment-page',
    template: `
    <ng-container [ngSwitch]="assessmentStatus">
        <voucher-assessment-submission-dialog *ngSwitchCase="'assessing'"
                [voucher]="voucher"
                (submit)="save()">
            <h4 title>Issue Foodcare voucher</h4>        
            
            <foodcare-voucher-assessment 
                assessment
                [member]="memberContext.member | async"
                [voucher]="voucher" 
                (voucherChange)="voucher = $event">
            </foodcare-voucher-assessment>
        </voucher-assessment-submission-dialog>
        
        <voucher-assessment-accepted-dialog *ngSwitchCase="'approved'"
                [voucher]="voucher">
            <h4 title>Foodcare voucher approved</h4>     
        </voucher-assessment-accepted-dialog>
        
        <voucher-assessment-rejected-dialog *ngSwitchCase="'rejected'"
                [errResponse]="errResponse"
                (resubmit)="resubmit()">
            <h4 title>Foodcare voucher rejected</h4>
        </voucher-assessment-rejected-dialog>
        
        <div *ngSwitchDefault>
            Invalid assessment status: {{assessmentStatus}}
        </div>
           
    </ng-container>
    `,
})
export class FoodcareVoucherAssessmentPage {
    private voucher: FoodcareVoucher;
    private errResponse: HttpResponse;

    constructor(
        private voucherManager: VoucherManager,
        private memberContext: MemberContext,
        private elementRef: ElementRef
    ) {}

    get assessmentStatus(): VoucherAssessmentStatus {
        return voucherAssessmentStatus(this.voucher, this.errResponse);
    }

    ngOnInit() {
        this.voucher = foodcareVoucher({});

        this.memberContext.member.first().switchMap(member => {
            return this.voucher.calcVouchersInFinancialYear(this.voucherManager, member);
        }).forEach(updatedVoucher => {
            this.voucher = <FoodcareVoucher>updatedVoucher;
        });
    }

    save() {
        this.memberContext.member.first().switchMap(member => {
            return this.voucherManager.save(member, this.voucher)
                .catch((errResponse: HttpResponse) => {
                    this.errResponse = errResponse;
                    return Observable.of(null);
                })
                .do(voucher => {
                    this.voucher = voucher;
                })
        })
        .subscribe();
    }

    resubmit() {
        this.errResponse = null;
    }
}
