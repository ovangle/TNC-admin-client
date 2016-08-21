import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnergyAccountType} from '../../../member/basic';

@Component({
    selector: 'eapa-voucher-energy-accounts-select',
    template: `
    <div class="form-group">
        <label class="control-label">{{label}}</label>
        <select class="form-control"
                [ngModel]="value"
                (ngModelChange)="valueChange.emit($event)">
            <option [ngValue]="[]">None selected</option>
            <option [ngValue]="['ELECTRICITY']">Electricity</option>
            <option [ngValue]="['GAS']">Gas</option>
            <option [ngValue]="['ELECTRICITY', 'GAS']">Electricity and gas</option>
        </select>
    </div>
    `,
    directives: [],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAVoucherEnergyAccountsSelect {
    @Input() label: string;

    @Input() value: EnergyAccountType[];
    @Output() valueChange = new EventEmitter<EnergyAccountType[]>();
}
