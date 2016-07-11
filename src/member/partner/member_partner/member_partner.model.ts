import {Iterable, List} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {Model, ModelBase, RefProperty} from "caesium-model/model";
import {ModelResolutionError} from "caesium-model/exceptions";

import {AlertLabel} from "../../../utils/alert_label/alert_label";

import {Member} from '../../member.model';
import {MemberManager} from '../../member.manager';
import {Name, Gender, Contact, Income} from '../../basic';
import {Carer, CarerManager} from '../../carer';
import {Partner} from '../partner.model';

@Model({kind: 'member.partner::MemberPartner', superType: Partner})
export abstract class MemberPartner extends Partner {
    @RefProperty({refName: '_partner', refType: Partner})
    partnerId: number;
    _partner: Member;

    // @DelegateProperty({delegate: 'member', propName: 'firstName'})
    get name(): Name {
        return this._partner.name;
    }

    // @DelegateProperty({delegate: 'member', propName: 'gender'})
    get gender(): Gender {
        this._assertMemberResolved();
        return this._partner.gender;
    }

    // @DelegateProperty({delegate: 'member', propName: 'contact'})
    get contact(): Contact {
        this._assertMemberResolved();
        return this._partner.contact;
    }

    // @DelegateProperty({delegate: 'member', propName: 'income'})
    get income(): Income {
        this._assertMemberResolved();
        return this._partner.income;
    }

    // @DelegateProperty({delegate: 'member', propName: 'carer'})
    get carer(): Carer {
        this._assertMemberResolved();
        return this._partner.carer;
    }

    get(propNameOrRefName: string): any {
        if (propNameOrRefName !== 'id'
            && propNameOrRefName !== '_partner'
            && propNameOrRefName !== 'partnerId'
        ) {
            this._assertMemberResolved();
        }
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
        if (propNameOrRefName !== 'id'
            && propNameOrRefName !== '_partner'
            && propNameOrRefName !== 'partnerId'
        ) {
            this._assertMemberResolved();
        }
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
        if (!this.isResolved('_partner'))
            throw new ModelResolutionError('member not resolved');
    }

    checkForAlertLabels(): Iterable.Indexed<AlertLabel | Iterable.Indexed<any>> {
        // TODO: Implementation
        return List<AlertLabel>();
    }

    resolve(memberManager: MemberManager): Observable<MemberPartner> {
        return <Observable<MemberPartner>>this.resolveProperty(memberManager, '_partner');
    }

    resolveCarer(carerManager: CarerManager): Observable<MemberPartner> {
        this._assertMemberResolved();
        return this.member.resolveCarer(carerManager)
            .map((member) => <MemberPartner>this.set('member', member));
    }
}
