import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {Address} from './address.model';

@Component({
    selector: 'address-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        <div class="form-group">
            <label for="street-input">Street</label> 
            <input type="text" class="form-control"  id="street-input"
                   [disabled]="disabled"
                   [ngModel]="address.street"
                   (ngModelChange)="_streetChange($event)">
        </div>   
        
        <div class="layout horizontal">
            <div class="form-group form-group-inline flex">
                <label for="city-input">City</label>
                <input type="text" class="form-control" id="city-input"
                    [disabled]="disabled"
                    [ngModel]="address.city"
                    (ngModelChange)="_cityChange($event)">
            </div>
             
            <div class="form-group form-group-inline postcode-input-group">
                <label for="postcode-input">Postcode</label>
                <input type="text" class="form-control" placeholder="Postcode"    
                    [disabled]="disabled"
                    [ngModel]="address.postcode"
                    (ngModelChange)="_postcodeChange($event)">
            </div>
        </div>
    </fieldset>
    `,
    styles: [`
    .form-group-inline + .form-group-inline {
        margin-left: 1rem;
    }    
    
    .postcode-input-group {
        max-width: 7rem;
    }
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressInput {
    @Input() address: Address;
    @Output() addressChange = new EventEmitter<Address>();

    @Input() label: string;
    @Input() disabled: boolean;

    _streetChange(street: string) {
        this.addressChange.emit(
            <Address>this.address.set('street', street)
        );
    }

    _cityChange(city: string) {
        this.addressChange.emit(
            <Address>this.address.set('city', city)
        );
    }

    _postcodeChange(postcode: string) {
        this.addressChange.emit(
            <Address>this.address.set('postcode', postcode)
        );
    }


}
