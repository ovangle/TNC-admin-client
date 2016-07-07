import {Map} from 'immutable';
import {Pipe, PipeTransform} from '@angular/core';

import {ArgumentError} from 'caesium-model/exceptions';

import {StaffType} from './staff_type.model';

@Pipe({name: 'staffType'})
export class StaffTypePipe implements PipeTransform {
    static _StaffTypeDisplayValues = Map<StaffType, string>([
        [StaffType.PermanentStaff, 'Permanent'],
        [StaffType.OfficeVolunteer, 'Office volunteer'],
        [StaffType.FoodcareVolunteer, 'Foodcare volunteer'],
        [StaffType.OtherVolunteer, 'Other volunteer']
    ]);

    transform(value: any, ...args: any[]) {
        var displayValues = StaffTypePipe._StaffTypeDisplayValues;
        if (displayValues.has(value))
            return displayValues.get(value);
        throw new ArgumentError('Invalid value for StaffType: ' + value);
    }
}
