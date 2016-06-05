import {Model, Property} from 'caesium-model/model';
import {str} from 'caesium-model/json_codecs';

import {
    Name, NAME_CODEC,
    Gender, GENDER_CODEC,
    Contact, CONTACT_CODEC,
    Income, INCOME_CODEC
} from '../basic';

import {Partner} from './partner.model';

@Model({kind: 'partner::NonMemberPartner', superType: Partner})
export abstract class NonMemberPartner extends Partner {
    @Property({codec: NAME_CODEC})
    name:Name;

    @Property({codec: GENDER_CODEC})
    gender:Gender;

    @Property({codec: CONTACT_CODEC})
    contact: Contact;

    @Property({codec: INCOME_CODEC})
    income: Income;

}
