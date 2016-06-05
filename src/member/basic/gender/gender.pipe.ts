import {Pipe, PipeTransform} from '@angular/core';

import {ArgumentError} from 'caesium-model/exceptions';
import {Gender} from './gender.model';

@Pipe({name: 'gender'})
export class GenderPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        switch(value) {
            case Gender.NotDisclosed:
                return 'Not disclosed';
            case Gender.Male:
                return 'Male';
            case Gender.Female:
                return 'Female';
            default:
                throw new ArgumentError('Invalid gender value: ' + value);
        }
    }
}
