import {Pipe, PipeTransform} from '@angular/core';

import {ArgumentError} from '../../../../../caesium-model/exceptions';

import {LivingArrangement} from './living_arrangement.model';

@Pipe({name: 'livingArrangement'})
export class LivingArrangementPipe implements PipeTransform {
    transform(value:any, ...args:any[]):any {
        switch (value) {
            case LivingArrangement.NotDisclosed:
                return 'Not disclosed';
            case LivingArrangement.PartTime:
                return 'Part time';
            case LivingArrangement.Occasional:
                return 'Occasional';
            case LivingArrangement.Never:
                return 'Never';
            default:
                throw new ArgumentError('Invalid living arrangement: ' + value);
        }
    }
}
