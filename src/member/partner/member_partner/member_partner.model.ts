import {Iterable, List} from 'immutable';

import {isDefined} from 'caesium-core/lang';
import {Model, ModelBase, RefProperty} from "caesium-model/model";
import {ModelResolutionError} from "caesium-model/exceptions";

import {Member} from '../../member.model';
import {Name, Gender, Contact, Income} from '../../basic';
import {Partner} from '../partner.model';
import {AlertLabel} from "../../../utils/alert_label/alert_label";

@Model({kind: 'partner::MemberPartner', superType: Partner})
export abstract class MemberPartner extends ModelBase implements Partner{
    @RefProperty({refName: 'member'})
    memberId: number;

    member: Member;

    // @DelegateProperty({delegate: 'member', propName: 'firstName'})
    get name(): Name {
        return this.member.name;
    }


    // @DelegateProperty({delegate: 'member', propName: 'gender'})
    get gender(): Gender {
        this._assertMemberResolved();
        return this.member.gender;
    }

    // @DelegateProperty({delegate: 'member', propName: 'contact'})
    get contact(): Contact {
        this._assertMemberResolved();
        return this.member.contact;
    }

    // @DelegateProperty({delegate: 'member', propName: 'income'})
    get income(): Income {
        this._assertMemberResolved();
        return this.member.income;
    }

    get(propNameOrRefName: string): any {
        this._assertMemberResolved();
        switch(propNameOrRefName) {
            case 'name':
                return this.name;
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
            case 'name':
                mutatedMember = this.member.set('name', value);
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
