import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Map} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {map, str} from 'caesium-model/json_codecs';
import {GENDER_VALUES} from '../basic';
import {Response as HttpResponse} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {YesNoSelect} from '../../utils/components/yesno_select.component';
import {DateInput} from '../../utils/date/date_input.component';
import {EnumSelect2} from '../../utils/enum';

import {Member} from '../member.model';
import {MemberManager} from '../member.manager';
import {MemberTermType, MemberTermTypeSelect} from '../term';
import {
    NameInput, AddressInput, ContactInput, IncomeInput, ResidentialStatusInput
} from '../basic';

@Component({
    selector: 'member-signup-form',
    moduleId: module.id,
    templateUrl: './signup_form.component.html',
    directives: [
        NameInput, DateInput, YesNoSelect,
        AddressInput, ContactInput, MemberTermTypeSelect,
        IncomeInput, ResidentialStatusInput,
        EnumSelect2, ROUTER_DIRECTIVES
    ],
    styleUrls: ['./signup_form.component.css'],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSignupForm {
    private genderValues = GENDER_VALUES;

    private member: Member;
    private errors = Map<string,boolean>({
        name: false
    });

    @Output() signupSuccess = new EventEmitter<Member>();
    @Output() signupCancel = new EventEmitter<any>();

    constructor(private memberManager: MemberManager) {}

    get isValid(): boolean {
        return this.errors.valueSeq().every(v => v);
    }


    ngOnInit() {
        this.member = this.memberManager.create(Member, {});
    }

    private propChanged(prop: string, value: any) {
        this.member = <Member>this.member.set(prop, value);
    }

    private propValidityChanged(prop: string, value: boolean) {
        this.errors = this.errors.set(prop, value);
    }

    private termTypeChanged(termType: MemberTermType) {
        var term = this.member.term.set('type', termType);
        this.member = <Member>this.member.set('term', term);
    }

    save(): Promise<any> {
        let response = this.memberManager.save(this.member);

        return response
            .handle({select: 201, decoder: this.memberManager.modelCodec})
            .forEach(member => {
                this.signupSuccess.emit(member);
            })
            .catch((response: HttpResponse) => {
                if (response.status === 400) {
                    return Observable.of<Member>(null);
                }
                return Observable.throw<Member>(response);
            });
    }

    close() {
        this.signupCancel.emit(true);
    }

}
