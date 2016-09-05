import moment = require('moment');
import {isBlank} from 'caesium-core/lang';
import {Converter} from 'caesium-core/converter';

export const DATE: Converter<Date,string> = function (date: Date) {
    if (isBlank(date))
        return '';

    let m = moment(date);
    return m.format('YYYY-MM-DD')
};

export const DATETIME: Converter<Date,string> = function(date: Date) {
    if (isBlank(date))
        return '';

    let m = moment(date);
    return m.toISOString();
};
