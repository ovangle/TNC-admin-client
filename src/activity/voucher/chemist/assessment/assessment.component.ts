import {Observable} from 'rxjs/Observable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {AsyncPipe} from '@angular/common';

import {UserContext} from '../../../../admin/user/context.service';
import {StaffMember} from '../../../../admin/staff/staff.model';

import {Member} from '../../../../member'
import {Name, NamePipe} from '../../../../member/basic';

import {VoucherAssessmentQuestion} from '../../assessment/assessment_question.component';
import {ChemistPrescriptionsInput} from '../prescription';

import {ChemistVoucher} from '../chemist_voucher.model';

@Component({
    selector: 'chemist-voucher-assessment',
    templateUrl: './assessment.component.html',
    directives: [
        VoucherAssessmentQuestion,
        ChemistPrescriptionsInput
    ],
    pipes: [NamePipe, AsyncPipe],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChemistVoucherAssessment {
    @Input() member: Member;

    @Input() voucher: ChemistVoucher;
    @Output() voucherChange = new EventEmitter<ChemistVoucher>();

    @Input() disabled: boolean;

    constructor(
        private userContext: UserContext
    ) {}

    get staffMember(): Observable<StaffMember> {
        return this.userContext.user
            .map(user => user.staffMember);
    }

    get staffMemberName(): Observable<Name> {
        return this.staffMember.map(staff => staff.name);
    }

    propChanged(prop: string, value: any) {
        this.voucherChange.emit(
            <ChemistVoucher>this.voucher.set(prop, value)
        );
    }
}
