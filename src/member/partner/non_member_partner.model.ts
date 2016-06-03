import {Model, Property} from 'caesium-model/model';
import {str} from '../../../../caesium-model/json_codecs';

import {Gender, genderCodec} from '../member/basic_info/gender.enum';

import {Partner} from './partner.model';
import {contactInfoCodec, ContactInfo} from "../member/contact/contact_info.record";
import {incomeInfoCodec, IncomeInfo} from "../member/income/income_info.record";


@Model({kind: 'partner::NonMemberPartner', superType: Partner})
export abstract class NonMemberPartner extends Partner {
    @Property({codec: str})
    firstName: string;

    @Property({codec: str})
    lastName: string;

    @Property({codec: genderCodec})
    gender: Gender;

    @Property({codec: contactInfoCodec})
    contact: ContactInfo;

    @Property({codec: incomeInfoCodec})
    income: IncomeInfo;

}
