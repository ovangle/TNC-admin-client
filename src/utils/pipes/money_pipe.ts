import {Pipe, PipeTransform} from '@angular/core';
import {isNumber} from 'caesium-core/lang';

@Pipe({name: 'money'})
export class MoneyPipe implements PipeTransform {
    transform (value: any, ...args: any[]) {
        if (isNumber(value)) {
            return `\$${value.toFixed(2)}`;
        }
        return value;
    }
}
