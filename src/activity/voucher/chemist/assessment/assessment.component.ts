import {Observable} from 'rxjs/Observable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {UserContext} from 'admin/user/context.service';

import {Member} from 'member'
import {Name} from 'member/basic';

import {VoucherManager} from '../../voucher.manager';

import {ChemistVoucher} from '../chemist_voucher.model';

@Component({
    selector: 'chemist-voucher-assessment',
    templateUrl: './assessment.component.html',
    styleUrls: [
        './assessment.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChemistVoucherAssessment {
    @Input() member: Member;

    @Input() voucher: ChemistVoucher;
    @Output() voucherChange = new EventEmitter<ChemistVoucher>();

    @Input() disabled: boolean;

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
            .map(staffMember => (isBlank(staffMember) ? null : staffMember.name));
    }

    propChanged(prop: string, value: any) {
        this.voucherChange.emit(
            <ChemistVoucher>this.voucher.set(prop, value)
        );
    }
}
