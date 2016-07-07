import {Pipe, PipeTransform} from '@angular/core';
import {isString} from 'caesium-core/lang';

@Pipe({name: 'capitalizeFirst'})
export class CapitalizeFirstPipe implements PipeTransform {
    transform (value: any, ...args: any[]) {
        if (isString(value)) {
            return value.charAt(0).toUpperCase()
                + value.substr(1).toLowerCase();
        }
    }
}
