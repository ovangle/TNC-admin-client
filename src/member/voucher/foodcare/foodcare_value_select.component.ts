import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {FoodcareValueDescription} from './foodcare_value_description.pipe';

@Component({
    selector: 'foodcare-value-select',
    template: `
    <select [ngValue]="value" (ngValueChange)="_valueChange.emit($event)">
        <option *ngFor="let option of options" [ngValue]="option">
            {{option | foodcareValueDescription}}
        </option>
    </select>
    `,
    pipes: [FoodcareValueDescription],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodcareValueSelect {
    @Input() value: number;
    @Output() valueChange = new EventEmitter<number>();

    options = [5, 10, 15, 20, 25];
}

