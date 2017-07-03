import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {NameModule} from 'member/basic/name';

import {VoucherManager} from '../voucher.manager';
import {VoucherAssessmentModule} from '../assessment/assessment.module';

import {FoodcareVoucherAssessmentPage} from './assessment_page.component';
import {FoodcareVoucherAssessment} from './assessment/assessment.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,

        NameModule,

        VoucherAssessmentModule
    ],
    providers: [
        VoucherManager
    ],
    declarations: [
        FoodcareVoucherAssessmentPage,
        FoodcareVoucherAssessment
    ],
    entryComponents: [
        FoodcareVoucherAssessmentPage
    ]
})
export class FoodcareVoucherModule {}
