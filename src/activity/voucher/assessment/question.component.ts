import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'voucher-assessment-question',
    template: `
    <div class="well">
        <fieldset>
            <legend>{{questionId}}</legend>
            <ng-content></ng-content>
        </fieldset>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherAssessmentQuestion {
    @Input() questionId: string;
}
