import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'foodcare-voucher-value-select',
    template: `
    <select class="form-control" [ngModel]="value" (ngModelChange)="valueChange.emit($event)">
        <option [ngValue]="5">$5 (one person)</option>
        <option [ngValue]="10">$10 (two people)</option>
        <option [ngValue]="15">$15 (three people)</option>
        <option [ngValue]="20">$20 (four people)</option>
        <option [ngValue]="25">$25 (five people)</option>
    </select>
    `,
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodcareVoucherValueSelect {
    @Input() value: number;
    @Output() valueChange = new EventEmitter<number>();
}

