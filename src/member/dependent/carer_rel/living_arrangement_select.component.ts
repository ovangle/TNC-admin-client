import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {LivingArrangement, LIVING_ARRANGEMENT_VALUES} from './living_arrangement.model';
import {LivingArrangementPipe} from './living_arrangement.pipe';

@Component({
    selector: 'living-arrangement-select',
    template: `
    <div class="form-group">
        <label for="select">{{label}}</label>
        <select name="select" class="form-control"
                [disabled]="disabled"
                [ngModel]="livingArrangement"
                (ngModelChange)="livingArrangementChange.emit($event)">
            <option *ngFor="let arrangement of livingArrangementValues"
                    [ngValue]="arrangement">
                {{arrangement | livingArrangement}}
            </option>
        </select>
    </div>
    `,
    pipes: [LivingArrangementPipe],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LivingArrangementSelect {
    livingArrangementValues = LIVING_ARRANGEMENT_VALUES;

    @Input() livingArrangement: LivingArrangement;
    @Output() livingArrangementChange = new EventEmitter<LivingArrangement>();

    @Input() label: string;
    @Input() disabled: boolean;
}
