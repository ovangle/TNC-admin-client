import {Iterable, List, Record} from 'immutable';

import {str, recordCodec, JsonObject} from 'caesium-model/json_codecs';

import {AlertLabel} from '../../utils/alert_label/alert_label';

import {Gender, genderCodec} from "../basic_info/gender.enum";
import {ContactInfo, contactInfoCodec} from "../contact/contact_info.record";
import {IncomeInfo, incomeInfoCodec} from "../income/income_info.record";

export interface Partner {
    firstName: string;
    lastName: string;
    gender: Gender;
    contact: ContactInfo;
    income: IncomeInfo;
}

const _PartnerRecord = Record({
    firstName: null,
    lastName: null,
    gender: null,
    contact: new ContactInfo(),
    income: new IncomeInfo()
});

export class NonMemberPartner extends _PartnerRecord implements Partner {
    firstName: string;
    lastName: string;
    gender: Gender;
    contact: ContactInfo;
    income: IncomeInfo;
}

export const nonMemberPartnerCodec = recordCodec<NonMemberPartner>(
    {
        firstName: str,
        lastName: str,
        gender: genderCodec,
        contact: contactInfoCodec,
        income: incomeInfoCodec
    },
    (args) => new NonMemberPartner(args)
);

export function checkForPartnerAlertLabels(partner: Partner): Iterable<number, AlertLabel | Iterable<number, any>> {
    //TODO: Need to define alert labels for partner.
    return List<AlertLabel>();
}

