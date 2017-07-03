import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {NameModule} from 'member/basic/name';
import {MemberDependentModule} from 'member/dependents';

import {VoucherManager} from '../voucher.manager';
import {VoucherAssessmentModule} from '../assessment/assessment.module';

import {ChemistVoucherAssessment} from './assessment/assessment.component';
import {ChemistPrescriptionInput} from './prescription/prescription_input.component';
import {ChemistVoucherAssessmentPage} from './assessment_page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,

        NameModule,
        MemberDependentModule,

        VoucherAssessmentModule
    ],
    providers: [
        VoucherManager
    ],
    declarations: [
        ChemistVoucherAssessment,
        ChemistPrescriptionInput,
        ChemistVoucherAssessmentPage
    ],
    exports: [
        ChemistVoucherAssessment,
        ChemistPrescriptionInput,
    ],
    entryComponents: [
        ChemistVoucherAssessmentPage
    ]

})
export class ChemistVoucherModule {}
