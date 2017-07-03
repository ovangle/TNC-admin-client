import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipesModule} from 'utils/pipes';

import {VoucherAssessmentQuestion} from './question.component';
import {VoucherAssessmentAcceptedDialog} from './accepted_dialog.component';
import {VoucherAssessmentSubmissionDialog} from './submission_dialog.component';
import {VoucherAssessmentRejectedDialog} from './rejected_dialog.component';

@NgModule({
    imports: [
        CommonModule,
        PipesModule
    ],
    declarations: [
        VoucherAssessmentQuestion,
        VoucherAssessmentAcceptedDialog,
        VoucherAssessmentRejectedDialog,
        VoucherAssessmentSubmissionDialog
    ],
    exports: [
        VoucherAssessmentQuestion,
        VoucherAssessmentAcceptedDialog,
        VoucherAssessmentRejectedDialog,
        VoucherAssessmentSubmissionDialog
    ]
})
export class VoucherAssessmentModule {}
