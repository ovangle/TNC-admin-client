import {Model, Property} from 'caesium-model/model';
import {str} from 'caesium-model/json_codecs';

import {
    Name, NAME_CODEC,
    Gender, GENDER_CODEC,
    Contact, CONTACT_CODEC,
    Income, INCOME_CODEC
} from '../../basic';

import {Partner} from '../partner.model';

@Model({kind: 'member.partner::NonMemberPartner', superType: Partner})
export abstract class NonMemberPartner extends Partner {
    @Property({
        codec: NAME_CODEC,
        defaultValue: () => new Name()
    })
    name:Name;

    @Property({
        codec: GENDER_CODEC,
        defaultValue: () => Gender.NotDisclosed
    })
    gender:Gender;

    @Property({
        codec: CONTACT_CODEC,
        defaultValue: () => new Contact()
    })
    contact: Contact;

    @Property({
        codec: INCOME_CODEC, 
        defaultValue: () => new Income()
    })
    income: Income;
}
