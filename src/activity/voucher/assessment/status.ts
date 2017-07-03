import {Response as HttpResponse} from '@angular/http';

import {isBlank} from 'caesium-core/lang';

import {Voucher} from '../voucher.model';

export type VoucherAssessmentStatus =
    'assessing'
    | 'approved'
    | 'rejected';

export function voucherAssessmentStatus(voucher: Voucher, response?: HttpResponse) {
    if (!isBlank(response)) {
        return 'rejected';
    }

    return isBlank(voucher.id) ? 'assessing': 'approved';
}

