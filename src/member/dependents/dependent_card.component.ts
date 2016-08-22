import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {DatePipe} from '@angular/common';
import {NamePipe} from '../basic';

import {GENDER_VALUES} from '../basic';

@Component({
    selector: 'dependent-card',
    template: `
    <div class="well layout horizontal">
        <span class="name flex"><strong>{{dependent.name | name}}</strong></span>
        <span class="gender flex">{{genderValues.get(dependent.gender)}}</span>
        <span class="date-of-birth flex">{{dependent.dateOfBirth | date}}</span>
        
        <span class="card-btn-group">
            <content select="div.btn-group"></content>
        </span>
    </div>
    `,
    directives: [],
    pipes: [NamePipe, DatePipe],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/flex.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentCard {
    private genderValues = GENDER_VALUES;

    @Input() dependent: boolean;
}
