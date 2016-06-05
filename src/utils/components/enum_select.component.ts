import {List} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    PipeTransform
} from '@angular/core'

@Component({
    selector: 'enum-select',
    template: `
    <div class="form-group">
        <label for="enum-select">{{label}}</label>
        <select id="enum-select" class="form-control"
                [disabled]="disabled"
                [ngModel]="value"
                (ngModelChange)="valueChange.emit($event)">
            <option *ngFor="let value of enumValues.toArray()" [ngValue]="value">
                {{enumPipe.transform(value)}}
            </option>
        </select> 
    </div>
    `,
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnumSelect {
    @Input() enumValues: List<any>;
    @Input() enumPipe: PipeTransform;

    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();

    @Input() label: string;
    @Input() disabled: boolean;
}
