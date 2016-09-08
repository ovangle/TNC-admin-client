import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'voucher-assessment-question',
    template: `
    <fieldset>
        <legend>Question {{questionId}}</legend>
        <content></content>
    </fieldset>
    `,
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    directives: [],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherAssessmentQuestion {
    @Input() questionId: string;
}
