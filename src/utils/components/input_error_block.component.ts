import {OrderedMap} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

// Avoid typing these out in every module that they're needed in.
export const STANDARD_INPUT_ERRORS = [
    ['required', 'A value is required'],
];

@Component({
    selector: 'input-error-block',
    template: `
    <div class="help-block"
          [ngClass]="{'has-error': inputTouched && currentError !== ''}">
        <span *ngIf="inputTouched">{{currentError}}</span>
    </div>      
    `,
    directives: [],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorBlock {

    @Input() inputTouched: boolean = false;

    @Input() inputErrors: {[key: string]: boolean};
    @Input() errorMessages: OrderedMap<string,string>;

    get currentError(): string {
        if (this.inputErrors === null)
            return '';
        return this.errorMessages.filter((value, key) => !!this.inputErrors[key])
            .valueSeq().first();
    }
}
