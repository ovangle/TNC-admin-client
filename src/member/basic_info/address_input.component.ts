import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from "@angular/core";

import {Address, AddressPipe} from './address.record';

@Component({
    selector: 'address-input',
    template: `
        <label for="address-fieldset">{{label}}</label>
        <div name="address-fieldset" class="layout horizontal">
            <div class="street-input flex-1">
            <input type="text" class="form-control" placeholder="Street"
                [disabled]="disabled"
                [ngModel]="address.street"
                (ngModelChange)="address = address.set('street', $event)"> 
            </div>    
            <div class="city-input">
            <input type="text" class="form-control" placeholder="City"
                [disabled]="disabled"
                [ngModel]="address.city"
                (ngModelChange)="address = address.set('city', $event)">
            </div>    
            <div class="postcode-input">
            <input type="text" class="form-control" placeholder="Postcode"
                [disabled]="disabled"
                [ngModel]="address.postcode"
                (ngModelChange)="address = address.set('postcode', $event)">
            </div>    
        </div>          
    `,
    styles: [` 
    .street-input, .city-input {
        margin-right: 1rem;
    }
    .city-input {
        max-width: 7em;
    }
    .postcode-input {
        width: 7em;
    }
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class AddressInput {
    @Input() address: Address;

    @Input() label: string;
    @Input() disabled: boolean;
}

