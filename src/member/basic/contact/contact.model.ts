import {Iterable, List, Record} from 'immutable'
import {AlertLabel, CheckForAlertLabels} from '../../../utils/alert_label/alert_label';


import {str, recordCodec} from "caesium-model/json_codecs";
import {phoneNumber} from '../../../utils/codecs';

const _CONTACT_RECORD = Record({email: '', phone: '', mobile: ''});

export class Contact extends _CONTACT_RECORD implements CheckForAlertLabels {
    email: string;
    phone: string;
    mobile: string;

    checkForAlertLabels(): Iterable.Indexed<AlertLabel|Iterable.Indexed<any>> {
        //TODO: Any labels apply?
        return List<AlertLabel>();
    }

    get emailHref(): string {
        if (this.email && this.email !== '') {
            return `mailto:${this.email}`;
        }
        return '';
    }
}

export const CONTACT_CODEC = recordCodec<Contact>({
    email: str,
    phone: phoneNumber('(dd) dddd dddd'),
    mobile: phoneNumber('dddd ddd ddd')
}, (args) => new Contact(args));
