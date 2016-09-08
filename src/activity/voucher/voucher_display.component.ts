import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Voucher} from './voucher.model';
import {EAPAVoucherAssessment} from './eapa';


@Component({
    selector: 'voucher-display',
    template: `
    <div [ngSwitch]="voucher.getType()">
    
    </div>
    <div class="row">
        <label class="col-sm-4 display-label">Value</label>
        <span class="col-sm-8 display-value">{{voucher.getValue()}}</span> 
    </div>
    `,
    directives: [
        EAPAVoucherAssessment
    ],
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('css/details_display.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherDisplay {
    @Input() voucher: Voucher;
}
