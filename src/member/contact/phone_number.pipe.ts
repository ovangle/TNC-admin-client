import {Pipe, PipeTransform} from 'angular2/core';
import {isString} from "angular2/src/facade/lang";

import {ArgumentError} from 'caesium-model/exceptions';
import {isBlank} from 'caesium-core/lang';

function transformLandline(phone: string) {
    if (isBlank(phone) || phone === '')
        return '';
    return `(${phone.slice(0, 2)})\u00A0${phone.slice(2,6)}\u00A0${phone.slice(6,10)}`;
}

function transformMobile(phone: string) {
    if (isBlank(phone) || phone === '')
        return '';
    return `${phone.slice(0,4)}\u00A0${phone.slice(4,7)}\u00A0${phone.slice(7,10)}`;
}

/**
 * Transforms a string representing a phone number into a
 * link to the phone number (with type depending on platform
 */
@Pipe({name: 'phone'})
export class PhonePipe implements PipeTransform {
    transform(value: any, args: any[]) {
        if (isBlank(value))
            return '';
        if (!isString(value))
            throw new TypeError(`Value not a string: ${value}`);

        if (args.length > 0 && args[0] === 'mobile') {
            return transformMobile(value);

        } else if (args.length > 0 && args[0] === 'landline') {
            return transformLandline(value);
        } else {
            throw new ArgumentError('Must be either a \'mobile\' or \'landline\' phone number');
        }
    }
}
