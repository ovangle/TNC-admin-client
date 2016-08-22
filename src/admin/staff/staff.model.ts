import {Set} from 'immutable';
import {forwardRef} from '@angular/core';

import {date, model} from 'caesium-model/json_codecs';
import {Model, ModelBase, Property, RefProperty} from 'caesium-model/model';

import {
    Name, NAME_CODEC,
    Address, ADDRESS_CODEC,
    Contact, CONTACT_CODEC
} from '../../member/basic';

import {User} from '../user/user.model';

import {StaffType, STAFF_TYPE_CODEC} from './type';
import {StaffAvailability, STAFF_AVAILABILITY_CODEC} from './availability';
import {StaffInductionSurvey} from './induction_survey';

@Model({kind: 'staff::StaffMember'})
export abstract class StaffMember extends ModelBase {
    @RefProperty({refName: 'user', refType: forwardRef(() => User)})
    userId:number;
    user:User;

    @Property({
        codec: STAFF_TYPE_CODEC,
        defaultValue: () => 'OFFICE_VOLUNTEER'
    })
    type:StaffType;

    @Property({codec: date})
    dateOfBirth: Date;

    @Property({
        codec: NAME_CODEC,
        defaultValue: () => new Name()
    })
    name:Name;

    @Property({
        codec: ADDRESS_CODEC,
        defaultValue: () => new Address()
    })
    address:Address;

    @Property({
        codec: CONTACT_CODEC,
        defaultValue: () => new Contact()
    })
    contact:Contact;

    @Property({
        codec: STAFF_AVAILABILITY_CODEC,
        defaultValue: () => new StaffAvailability()
    })
    availability:StaffAvailability;

    /*
    @RefProperty({refName: 'inductionSurvey'})
    inductionSurveyId:number;
    */
    @Property({
        codec: model(StaffInductionSurvey)
    })
    inductionSurvey:StaffInductionSurvey;
}

