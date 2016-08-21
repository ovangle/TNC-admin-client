import {Map} from 'immutable';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {AsyncPipe} from '@angular/common';

import {isBlank} from 'caesium-core/lang';

import {UserContext, StaffMember} from '../../../../admin';
import {Member} from '../../../../member';
import {Name, NamePipe} from '../../../../member/basic';

import {VoucherAssessmentQuestion} from '../../assessment/assessment_question.component';

import {EAPAVoucher} from '../eapa_voucher.model';
import {
    EnergyAccountType, ENERGY_ACCOUNT_TYPE_VALUES,
    EnergyAccount, EnergyAccountBill
} from '../bill/bill.model';
import {EAPAVoucherBillInput} from '../bill/bill_input.component';

import {EAPAVoucherEnergyAccountsSelect} from '../voucher_accounts_select.component';

@Component({
    selector: 'eapa-voucher-assessment',
    moduleId: module.id,
    pipes: [NamePipe, AsyncPipe],
    templateUrl: './voucher_assessment.component.html',
    styleUrls: [ './voucher_assessment.component.css' ],
    directives: [
        VoucherAssessmentQuestion,
        EAPAVoucherBillInput,
        EAPAVoucherEnergyAccountsSelect
    ],
    encapsulation: ViewEncapsulation.Native,
})
export class EAPAVoucherAssessment {

    @Input() member: Member;
    @Output() memberChange = new EventEmitter<Member>();

    @Input() voucher: EAPAVoucher;
    @Output() voucherChange = new EventEmitter<EAPAVoucher>();

    @Output() validityChange = new EventEmitter<boolean>();

    /// If we are reviewing the content of the form.
    @Input() disabled: boolean = false;

    private energyAccountTypes: EnergyAccountType[];

    constructor(private userContext: UserContext) {}

    get isValid(): boolean {
        return !this.voucher.isFacingHardship
            || this.voucher.bills.isEmpty()
            || !this.voucher.isCustomerDeclarationSigned
            || !this.voucher.isAssessorDeclarationSigned
            || !this.voucher.isValidLimitExemption;
    }


    private propChanged(prop: string, value: any) {
        this.voucherChange.emit(<EAPAVoucher>this.voucher.set(prop, value));
        this.validityChange.emit(this.isValid);
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

        console.log(bills.toJS());
        this.propChanged('bills', bills);
    }

    private voucherBillChanged(accountType: EnergyAccountType, bill: EnergyAccountBill) {
        let bills = this.voucher.bills.set(accountType, bill);
        this.propChanged('bills', bills);
    }

    get staffMember(): Observable<StaffMember> {
        return this.userContext.user
            .map(user => {
                console.log('Got user', user.staffMember);
                return user.staffMember
            });
    }

    get staffMemberName(): Observable<Name> {
        return this.staffMember.map(staffMember => staffMember.name);
    }
}
