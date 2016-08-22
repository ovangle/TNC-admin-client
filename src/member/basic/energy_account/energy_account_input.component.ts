import {Map} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {EnumSelect2} from '../../../utils/enum';

import {Name, NamePipe} from '../name';
import {Address, AddressPipe} from '../address';

import {EnergyAccountType, ENERGY_ACCOUNT_TYPE_VALUES} from './energy_account_type.model';
import {EnergyAccount} from './energy_account.model';
import {EnergyRetailer, ENERGY_RETAILER_VALUES} from './energy_retailer.model';

@Component({
    selector: 'energy-account-input',
    template: `
    <style>
    :host { display: block; }
    </style>
    <fieldset>
        <legend>{{accountType}} Account</legend>
        <enum-select2 class="col-sm-12" 
                      [enumValues]="energyRetailerValues"
                      [label]="'Retailer'"
                      [value]="energyAccount.retailer"
                      (valueChange)="propChanged('retailer', $event)">
        </enum-select2>
        
        <div class="form-group col-sm-12">
            <label for="account-number-input">Account number</label> 
            <input type="text" class="form-control"
                   [ngModel]="energyAccount.accountNumber"
                   (ngModelChange)="propChanged('accountNumber', $event)">
        </div>                          
        
        <div class="checkbox col-sm-12">
            <label>
                <input type="checkbox" 
                    [ngModel]="errors.isResidential"
                    (ngModelChange)="errsChanged('isResidential', $event)">
                The account is a <em>residential</em> {{accountType}} account
            </label>
        </div>
        
        <div class="checkbox col-sm-12">
            <label>
                <input type="checkbox" 
                       [ngModel]="errors.isCorrectName"
                       (ngModelChange)="errsChanged('isCorrectName', $event)">
                The account is the name of <em>{{name | name}}</em>
            </label> 
        </div>
        
        <div class="checkbox col-sm-12">
            <label>
                <input type="checkbox" 
                        [ngModel]="errors.isCorrectAddress"
                        (ngModelChange)="errsChanged('isCorrectAddress', $event)">
                The address on the account is <em>{{address | address}}</em>
            </label> 
        </div>
        
        <div class="col-sm-12 alert alert-danger" *ngIf="hasErrors">
            <p>The energy account is invalid.</p> 
            <ul>
                <li *ngIf="errors.get('invalidAccountRetailer')">Account retailer must be provided</li>
                <li *ngIf="errors.get('invalidAccountNumber')">Invalid account number</li>
                <li *ngIf="!errors.get('isResidential')">Must apply to a residential account</li> 
                <li *ngIf="!errors.get('isCorrectName')">Invalid name on account</li>
                <li *ngIf="!errors.get('isCorrectAddress')">Invalid address on account</li>
            </ul>
        </div>
        
        <div class="form-buttons">
            <button class="btn btn-primary" (click)="commit.emit(true)">
                <i class="fa fa-save"></i> Save
            </button> 
        </div>
    </fieldset>
    `,
    directives: [EnumSelect2],
    pipes: [NamePipe, AddressPipe],
    styleUrls: [
        '../../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyAccountInput {
    private energyRetailerValues = ENERGY_RETAILER_VALUES;

    @Input() name: Name;
    @Input() address: Address;

    @Input() energyAccount: EnergyAccount;
    @Output() energyAccountChange= new EventEmitter<EnergyAccount>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Output() commit = new EventEmitter<any>();

    @Input() label: string;
    @Input() disabled: boolean;

    private errors = Map<string,boolean>({
        invalidAccountRetailer: true,
        invalidAccountNumber: true,
        isResidential: false,
        isCorrectName: false,
        isCorrectAddress: false
    });

    private get hasErrors(): boolean {
        return this.errors.get('invalidAccountRetailer')
            || this.errors.get('invalidAccountNumber')
            || !this.errors.get('isResidential')
            || !this.errors.get('isCorrectName')
            || !this.errors.get('isCorrectAddress');
    }


    private _propValidity = Map<string,boolean>({
        energyAccount: true,
        accountNumber: true
    });

    get isValid(): boolean {
        return this._propValidity.valueSeq().every((v) => v);
    }

    propChanged(prop: string, value: any) {
        this.refreshErrors();
        this.energyAccountChange.emit(
            <EnergyAccount>this.energyAccount.set(prop, value)
        );
    }

    propValidityChanged(prop: string, validity: boolean) {
        this._propValidity = this._propValidity.set(prop, validity);
        this.validityChange.emit(this.isValid);
    }

    get accountType(): string {
        return ENERGY_ACCOUNT_TYPE_VALUES.get(
            this.energyAccount.get('type', this.energyAccount.type)
        );
    }

    private refreshErrors() {
        this.errors = this.errors.withMutations(mutator => {
            mutator = mutator.set('invalidAccountRetailer', this.energyAccount.retailer === 'NOT_DISCLOSED');
            mutator = mutator.set('invalidAccountNumber', this.energyAccount.accountNumber === '');
            return mutator;
        });
        this.validityChange.emit(this.hasErrors);
    }

    private errsChanged(err: string, value: boolean) {
        this.errors = this.errors.set(err, value);
        this.validityChange.emit(this.hasErrors);
    }

}
