import {Iterable, List, Record} from 'immutable'
import {AlertLabel, CheckForAlertLabels} from '../../utils/alert_label/alert_label.ts';


import {str, recordCodec} from "caesium-model/json_codecs";
export class ContactInfo
extends Record({email: '', phone: '', mobile: ''})
implements CheckForAlertLabels {
    email: string;
    phone: string;
    mobile: string;

    checkForAlertLabels(): Iterable<number, AlertLabel|Iterable<number,any>> {
        //TODO: Any labels apply?
        return List<AlertLabel>();
    }
}

export const contactInfoCodec = recordCodec<ContactInfo>(
    {email: str, phone: str, mobile: str},
    (args) => new ContactInfo(args)
);
