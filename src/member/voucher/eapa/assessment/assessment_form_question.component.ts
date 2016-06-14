import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'eapa-assessment-form-question',
    template: `
        <fieldset>
            <legend>Question {{questionId}}</legend>
            <content></content>
        </fieldset>
    `,
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAAssessmentFormQuestion {
    @Input() questionId: number;

}

