
import moment = require('moment');
import {Moment} from 'moment/moment';

import {Iterable, List, Record} from 'immutable';

import {AlertLabel, CheckForAlertLabels, LabelSeverity} from '../../utils/alert_label/alert_label.ts';

import {MemberTermType, memberTermTypeCodec} from './term_type.enum';
import {date, recordCodec} from "caesium-model/json_codecs";

/**
 * Return the end of the financial year containing the given date.
 *
 * @param containgDate
 * Any date within the financial year.
 */
function untilEndOfFinancialYear(containingDate: Moment): Moment {
    var calendarYear = containingDate.year();
    if (containingDate.month() >= 6) {
        calendarYear++
    }
    return moment.utc({year: calendarYear, month: 7});
}

function forOneMonth(after: Moment): Moment {
    return after.clone().add(1, 'Months');
}

type _TermDuration = (startDate: Moment) => Moment ;

function memberTermDuration(type: MemberTermType): _TermDuration {
    switch (type) {
        case MemberTermType.Temporary:
            return forOneMonth;
        case MemberTermType.Associate:
        case MemberTermType.General:
            return untilEndOfFinancialYear;
        default:
            throw new TypeError('Invalid value for member term type: ${type}');
    }
}

const _TermRecord = Record({type: MemberTermType.Temporary, joined: new Date(), renewed: null});

export class MemberTerm extends _TermRecord implements CheckForAlertLabels {

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
    _expires: Date;


    /**
     * The start date of the term of membership.
     */
    get startDate(): Date {
        return this.renewed || this.joined;
    }

    /**
     * The date the membership expired, or will expire
     */
    get endDate(): Date {
        if (this._expires) {
            return this._expires;
        }
        var term_start = moment(this.startDate);
        var term_duration = memberTermDuration(this.type);
        return term_duration(term_start).toDate();
    }

    get isExpired(): boolean {
        return moment(this.endDate).isBefore(moment());
    }

    checkForAlertLabels():Iterable<any, AlertLabel|Iterable<any, any>> {
        return _TERM_LABELS
            .filter((label) => label.test(this));
    }
}

export const memberTermCodec = recordCodec<MemberTerm>(
    {
        type: memberTermTypeCodec,
        joined: date,
        renewed: date
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
