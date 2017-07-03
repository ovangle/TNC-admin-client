import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {
    Component, Input, Output, EventEmitter
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {UserContext} from 'admin';
import {Member} from 'member';
import {Name} from 'member/basic';

import {EAPAVoucher} from '../eapa_voucher.model';
import {
    EnergyAccountType, ENERGY_ACCOUNT_TYPE_VALUES,
    EnergyAccount, EnergyAccountBill
} from '../bill/bill.model';

@Component({
    selector: 'eapa-voucher-assessment',
    templateUrl: './assessment.component.html',
    styleUrls: [
        './assessment.component.css'
    ]
})
export class EAPAVoucherAssessment {
    @Input() member: Member;

    @Input() voucher: EAPAVoucher;
    @Output() voucherChange = new EventEmitter<EAPAVoucher>();

    /// If we are reviewing the content of the form.
    @Input() disabled: boolean = false;

    private energyAccountTypes: EnergyAccountType[];

    constructor(private userContext: UserContext) {}

    private propChanged(prop: string, value: any) {
        this.voucherChange.emit(<EAPAVoucher>this.voucher.set(prop, value));
    }

    private energyAccountTypesChanged(accountTypes: EnergyAccountType[]) {
        let bills = this.voucher.bills.withMutations(mutator => {
            for (let accountType of accountTypes) {
                if (isBlank(mutator.get(accountType))) {
                    let account = this.member.energyAccounts.get(accountType);
                    if (isBlank(account)) {
                        account = new EnergyAccount({type: accountType});
                    }
                    let bill = new EnergyAccountBill({account: account});
                    mutator = mutator.set(accountType, bill);
                }
            }

            ENERGY_ACCOUNT_TYPE_VALUES.keySeq().forEach(accountType => {
                if (mutator.has(accountType) && !(accountTypes as any).includes(accountType)) {
                    mutator = mutator.remove(accountType);
                }
            });
        });

        this.propChanged('bills', bills);
    }

    private voucherBillChanged(accountType: EnergyAccountType, bill: EnergyAccountBill) {
        let bills = this.voucher.bills.set(accountType, bill);
        this.propChanged('bills', bills);
    }

    get staffMemberName(): Observable<Name> {
        return this.userContext.staffMember
            .map(staffMember => isBlank(staffMember) ? null : staffMember.name);
    }
}
