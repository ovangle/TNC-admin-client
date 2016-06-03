import {Iterable, List} from 'immutable';

import {Model, ModelBase, RefProperty} from "caesium-model/model";
import {isDefined} from 'caesium-core/lang';

import {Member} from '../member/member.model';
import {Gender} from '../member/basic_info/gender.enum';
import {ContactInfo} from '../member/contact/contact_info.record';
import {IncomeInfo} from '../member/income/income_info.record';
import {Partner} from './partner.model';
import {ModelResolutionError} from "../../../../caesium-model/exceptions";
import {AlertLabel} from "../utils/alert_label/alert_label";

@Model({kind: 'partner::MemberPartner', superType: Partner})
export abstract class MemberPartner extends ModelBase implements Partner{
    @RefProperty({refName: 'member'})
    memberId: number;

    member: Member;

    // @DelegateProperty({delegate: 'member', propName: 'firstName'})
    get firstName(): string {
        this._assertMemberResolved();
        return this.member.firstName;
    }

    // @DelegateProperty({delegate: 'member', propName: 'lastName'})
    get lastName(): string {
        this._assertMemberResolved();
        return this.member.lastName;
    }

    // @DelegateProperty({delegate: 'member', propName: 'gender'})
    get gender(): Gender {
        this._assertMemberResolved();
        return this.member.gender;
    }

    // @DelegateProperty({delegate: 'member', propName: 'contact'})
    get contact(): ContactInfo {
        this._assertMemberResolved();
        return this.member.contact;
    }

    // @DelegateProperty({delegate: 'member', propName: 'income'})
    get income(): IncomeInfo {
        this._assertMemberResolved();
        return this.member.income;
    }

    get(propNameOrRefName: string): any {
        this._assertMemberResolved();
        switch(propNameOrRefName) {
            case 'firstName':
                return this.firstName;
            case 'lastName':
                return this.lastName;
            case 'gender':
                return this.gender;
            case 'contact':
                return this.contact;
            case 'income':
                return this.income;
            default:
                return super.get(propNameOrRefName);
        }
    }

    set(propNameOrRefName: string, value: any): /* this */ModelBase {
        var mutatedMember: Member;
        this._assertMemberResolved();
        switch(propNameOrRefName) {
            case 'firstName':
                mutatedMember = this.member.set('firstName', value);
                break;
            case 'lastName':
                mutatedMember = this.member.set('lastName', value);
                break;
            case 'gender':
                mutatedMember = this.member.set('gender', value);
                break;
            case 'contact':
                mutatedMember = this.member.set('contact', value);
                break;
            case 'income':
                mutatedMember = this.member.set('income', value);
                break;
            default:
                return super.set(propNameOrRefName, value);
        }
        return super.set('member', mutatedMember);
    }

    private _assertMemberResolved() {
        if (!isDefined(this.member))
            throw new ModelResolutionError('member not resolved');
    }

    checkForAlertLabels(): Iterable.Indexed<AlertLabel | Iterable.Indexed<any>> {
        // TODO: Implementation
        return List<AlertLabel>();
    }
}
