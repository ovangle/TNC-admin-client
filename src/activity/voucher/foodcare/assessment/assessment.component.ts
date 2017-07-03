import {Observable} from 'rxjs/Observable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {UserContext} from 'admin/user/context.service';
import {Name} from 'member/basic';
import {Member} from 'member';

import {VoucherManager} from '../../voucher.manager';
import {FoodcareVoucher} from '../foodcare_voucher.model';

@Component({
    selector: 'foodcare-voucher-assessment',
    templateUrl: './assessment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodcareVoucherAssessment {
    @Input() member: Member;
    @Input() voucher: FoodcareVoucher;
    @Output() voucherChange = new EventEmitter<FoodcareVoucher>();

    constructor(
        private userContext: UserContext,
        private voucherManager: VoucherManager
    ) {}

    get staffMemberName(): Observable<Name> {
        let task = this.voucher.task;
        if (task && task.staffName) {
            return Observable.of(this.voucher.task.staffName);
        }
        return this.userContext.staffMember
            .map(staffMember => isBlank(staffMember) ? null : staffMember.name);
    }

    propChanged(prop: string, value: any) {
        this.voucherChange.emit(
            <FoodcareVoucher>this.voucher.set(prop, value)
        );
    }
}
