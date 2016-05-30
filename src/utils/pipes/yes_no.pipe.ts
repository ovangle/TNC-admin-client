import {Pipe, PipeTransform} from 'angular2/core'

import {isBoolean} from 'caesium-core/lang';

/**
 * If the value is blank, return the given representation
 * (which defaults to 'Unknown'), otherwise returns the value
 * unchanged
 *
 * Usage:
 *  {{value | valueOr:'Unknown'}}
 *
 * Example:
 *  {{ null | valueOr: 'Unknown'}}
 *  formats to 'Unknown'
 *
 *  {{ 'Hello' | valueOr: 'Unknown'}}
 *  formats to 'Hello'
 */
@Pipe({name: 'yesNo'})
export class YesNo implements PipeTransform {
    transform(value:any, args: any[]):any {
        if (!isBoolean(value))
            return value;
        return value ? 'Yes': 'No';
    }
}

