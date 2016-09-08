import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Voucher} from './voucher.model';

@Component({
    selector: 'issue-voucher-submission',
    template: `
        <div>Value: <em>$ {{voucher.getValue()}}</em></div>
        <div *ngIf="!voucher.isValid">
            The voucher is invalid, please review assessment
            and correct any errors.
        </div>
    `,
    directives: [],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueVoucherSubmission {
    @Input() voucher: Voucher;
}
