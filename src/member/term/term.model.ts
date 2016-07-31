
import moment = require('moment');

import {Iterable, List, Record} from 'immutable';

import {AlertLabel, CheckForAlertLabels, LabelSeverity} from '../../utils/alert_label/alert_label';

import {MemberTermType, MEMBER_TERM_TYPE_CODEC} from './term_type.model';
import {dateTime, recordCodec} from "caesium-model/json_codecs";

const _TERM_RECORD = Record({
    type: 'TEMPORARY',
    joined: new Date(),
    renewed: null,
    expires: new Date()
});

export class MemberTerm extends _TERM_RECORD implements CheckForAlertLabels {

    type: MemberTermType;
    /**
     * The date the member joined the neighbourhood centre
     */
    joined: Date;
    /**
     * The last time the term was renewed.
     */
    renewed: Date;

    /**
     * The time that the member term expires, as fetched from the server
     *
     */
    expires: Date;

    constructor(args?: {type?: MemberTermType, joined?: Date, renewed?: Date}) {
        super(args);
    }

    get isExpired(): boolean {
        return moment(this.expires).isBefore(moment());
    }

    checkForAlertLabels():Iterable<any, AlertLabel|Iterable<any, any>> {
        return _TERM_LABELS
            .filter((label) => label.test(this));
    }
}

export const MEMBER_TERM_CODEC = recordCodec<MemberTerm>(
    {
        type: MEMBER_TERM_TYPE_CODEC,
        joined: dateTime,
        renewed: dateTime,
        expires: dateTime
    },
    (args) => new MemberTerm(args)
);

const _TERM_LABELS = List<AlertLabel>([
    {
        text: 'membership expired',
        severity: LabelSeverity.Warning,
        tooltip: 'Membership term has expired',
        test: (term: MemberTerm) => term.isExpired
    }
]);
