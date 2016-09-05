import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {VoucherAssessmentQuestion} from '../../assessment/assessment_question.component';

import {FoodcareVoucher} from '../foodcare_voucher.model';

@Component({
    selector: 'foodcare-voucher-assessment',
    template: `
    
    `,
    directives: [
        VoucherAssessmentQuestion
    ],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodcareVoucherAssessment {
    @Input() voucher: FoodcareVoucher;
}
