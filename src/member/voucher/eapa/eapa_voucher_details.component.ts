import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {EAPAVoucher} from './eapa_voucher.model';

@Component({
    selector: 'eapa-voucher-details',
    template: `EAPA Voucher`,
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAVoucherDetails {
    @Input() voucher: EAPAVoucher;
}


