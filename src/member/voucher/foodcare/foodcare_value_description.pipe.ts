import {Pipe, PipeTransform} from '@angular/core';

const _FMT_PEOPLE: {[index: number]: string} = {
    1: 'One person',
    2: 'Two people',
    3: 'Three people',
    4: 'Four people',
    5: 'Five people'
};

@Pipe({name: 'foodcareValueDescription'})
export class FoodcareValueDescription implements PipeTransform {
    transform(value: any, ...args: any[]): string {
        var numPeople = Math.floor(value / 5);
        return `\$${value} (${_FMT_PEOPLE[numPeople]})`;
    }
}
