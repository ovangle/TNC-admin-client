import {Map} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {EnumSelect2} from '../../../utils/enum';

import {EnergyAccount} from './energy_account.model';
import {EnergyRetailer, ENERGY_RETAILER_VALUES} from './energy_retailer.model';

@Component({
    selector: 'energy-account-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        <enum-select2 [enumValues]="energyRetailerValues"
                      [label]="Retailer"
                      [value]="energyAccount.retailer"
                      (valueChange)="propChanged('retailer', $event)">
        </enum-select2>
        
        <div class="form-group">
            <label for="account-number-input">Account number</label> 
            <input type="text" class="form-control"
                   [ngModel]="energyAccount.accountNumber"
                   (ngModelChange)="propChanged('accountNumber', $event)">
        </div>                          
       
    </fieldset>
    `,
    directives: [EnumSelect2],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyAccountInput {
    private energyRetailerValues = ENERGY_RETAILER_VALUES;

    @Input() energyAccount: EnergyAccount;
    @Output() energyAccountChange= new EventEmitter<EnergyAccount>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() label: string;
    @Input() disabled: boolean;

    private _propValidity = Map<string,boolean>({
        energyAccount: true,
        accountNumber: true
    });

    get isValid(): boolean {
        return this._propValidity.valueSeq().every((v) => v);
    }

    propChanged(prop: string, value: any) {
        this.energyAccountChange.emit(
            <EnergyAccount>this.energyAccount.set(prop, value)
        );
    }

    propValidityChanged(prop: string, validity: boolean) {
        this._propValidity = this._propValidity.set(prop, validity);
        this.validityChange.emit(this.isValid);
    }

}
