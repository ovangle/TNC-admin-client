import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DateInput} from '../../utils/date/date_input.component';

import {NamePipe, NameInput} from '../basic';

import {Dependent} from './dependent.model';


@Component({
    selector: 'dependent-list-item',
    template: `
        <div class="card">
            <name-input [name]="dependent.name"
                        (nameChange)="_nameChanged($event)"
                        [aliasHidden]="true"></name-input>
            
            <date-input [label]="'Date of Birth'"
                        [disabled]="disabled"
                        [date]="dependent.dateOfBirth"
                        (dateChange)="_dateOfBirthChange($event)"></date-input>
        </div>
    `,
    directives: [
        DateInput, NameInput
    ],
    pipes: [NamePipe, DatePipe],
    styles: [`
    .card {
        background-color: #e7e7e7;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }    
    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentListItem {
    @Input() dependent: Dependent;
    @Output() dependentChange = new EventEmitter<Dependent>();

    @Input() disabled: boolean;
    _dateOfBirthChange(date: Date) {
        this.dependentChange.emit(
            <Dependent>this.dependent.set('dateOfBirth', date)
        )
    }
}
