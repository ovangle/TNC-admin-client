
import {Component, Input, Output, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter} from "@angular/core";

import {Gender, GENDER_VALUES, GenderPipe} from './gender.enum';
@Component({
    selector: 'gender-select',
    template: `
    <div class="form-group">
        <label for="gender-select">{{label}}</label>
        <select name="gender-select"
                [disabled]="disabled"
                class="form-control"
                [ngModel]="gender"
                (ngModelChange)="genderChange.emit($event)">
            <option value="null">Unknown</option>
            <option *ngFor="let value of genderValues" [value]="value">{{value | gender}}</option>
        </select>
    </div>
    `,
    pipes: [GenderPipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderSelect {
    genderValues = GENDER_VALUES;

    @Input() gender:Gender;
    @Output() genderChange = new EventEmitter<Gender>();

    @Input() label:string;
    @Input() disabled:boolean;
}
