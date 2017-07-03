import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';


import {Member} from 'member';
import {
    ENERGY_ACCOUNT_TYPE_VALUES, EnergyAccountBill
} from './bill.model';

@Component({
    selector: 'eapa-voucher-bill-input',
    template: `
    <style>
    :host {
        display: block;
    }   
    </style>
    <div *ngIf="bill" class="clearfix">
        <div [ngSwitch]="editing">
            <energy-account-input 
                *ngSwitchCase="true"
                [name]="member.name"
                [address]="member.address"
                [energyAccount]="bill.account"
                (energyAccountChange)="propChanged('account', $event)"
                (commit)="save()">
            </energy-account-input>
            
            <div *ngSwitchCase="false">
                <energy-account-display
                    *ngSwitchCase="false"
                    class="col-sm-12"
                    [energyAccount]="bill.account"
                    (edit)="edit()"
                    [disabled]="true">
                </energy-account-display>
            </div>
        </div>
        
        <!-- TODO: money-input -->
        <div class="form-group col-sm-12">
            <label class="control-label" for="bill-amount">Amount</label>
            <input class="form-control" id="bill-amount" type="text"
                [ngModel]="bill.value"
                (ngModelChange)="propChanged('value', $event)">
        </div>       
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAVoucherBillInput {
    @Input() member: Member;
    @Output() memberChange = new EventEmitter<Member>();

    @Input() bill: EnergyAccountBill;
    @Output() billChange = new EventEmitter<EnergyAccountBill>();

    @Input() disabled: boolean;

    private editing: boolean;

    private edit() {
        this.editing = true;
    }

    private save() {
        this.editing = false;
    }

    ngOnInit() {
        this.editing = !this.bill.account.isValid;
    }

    private propChanged(prop: string, value: any) {
        this.billChange.emit(
            <EnergyAccountBill>this.bill.set(prop, value)
        );
        if (prop === 'account') {
            let accounts = this.member.energyAccounts
                .set(this.bill.account.type, value);
            this.memberChange.emit(
                this.member.set('energyAccounts', accounts)
            );
        }
    }

    private get displayAccountType(): string {
        return ENERGY_ACCOUNT_TYPE_VALUES.get(this.bill.account.type);
    }

}
