import {Iterable, List, Record} from 'immutable'
import {AlertLabel, CheckForAlertLabels} from '../../../utils/alert_label/alert_label';


import {str, recordCodec} from "caesium-model/json_codecs";

const _CONTACT_RECORD = Record({email: '', phone: '', mobile: ''});

export class Contact extends _CONTACT_RECORD implements CheckForAlertLabels {
    email: string;
    phone: string;
    mobile: string;

    checkForAlertLabels(): Iterable.Indexed<AlertLabel|Iterable.Indexed<any>> {
        //TODO: Any labels apply?
        return List<AlertLabel>();
    }
}

export const CONTACT_CODEC = recordCodec<Contact>(
    {email: str, phone: str, mobile: str},
    (args) => new Contact(args)
);
