import {Pipe, PipeTransform} from 'angular2/core';
import {isBlank} from 'caesium-core/lang';

/**
 * If the value is blank, return the given representation
 * (which defaults to 'Unknown'), otherwise returns the value
 * unchanged
 *
 * Usage:
 *  {{value | default:'Unknown'}}
 *
 * Example:
 *  {{ null | default: 'Unknown'}}
 *  formats to 'Unknown'
 *
 *  {{ 'Hello' | default: 'Unknown'}}
 *  formats to 'Hello'
 */
@Pipe({name: 'default'})
export class DefaultPipe implements PipeTransform {
    transform(value:any, args: any[]):any {
        if (isBlank(value)) {
            var defaultValue = 'Unknown';
            if (args.length > 0) {
                defaultValue = args[0];
            }
            return defaultValue;
        }
        return value;
    }

}
