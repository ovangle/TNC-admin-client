import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {isDefined} from 'caesium-core/lang';

import {Address} from './address.model';
import {AddressFormBuilder} from './address.form';

@Component({
    selector: 'address-input',
    template: `
    <style>
    .input-right {
        margin-left: 30px;
    }
    
    .postcode-input-group {
        max-width: 7rem;
    } 
    </style>
    <label>Address</label>
    <div class="layout horizontal" [formGroup]="addressGroup">
        <div class="form-group flex-4">
            <label for="street-input" class="sr-only">Street</label> 
            <input type="text" class="form-control"  id="street-input"
                   [placeholder]="'Street'"
                   formControlName="street">
        </div>   
    
        <div class="form-group flex input-right">
              
            <input type="text" class="form-control" id="city-input"
                [placeholder]="'City'"
                formControlName="city">
                <!--
                [ngModel]="address.city"
                (ngModelChange)="propChanged('city', $event)">
                -->
        </div>
         
        <div class="form-group postcode-input-group input-right"
             [ngClass]="{
                'has-error': postcodeControl.touched && !postcodeControl.valid
             }">
            <label for="postcode-input" class="sr-only">Postcode</label>
            <input type="text" class="form-control" 
                [placeholder]="'Postcode'"
                formControlName="postcode">
            <span class="help-block" 
                  *ngIf="postcodeControl.touched && postcodeControl.errors?.pattern">
                  Invalid postcode
            </span>     
            <span class="help-block"
                  *ngIf="postcodeControl.touched && postcodeControl.errors?.required">
                A value is required       
            </span>
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressInput {
    @Input() address: Address;
    @Output() addressChange = new EventEmitter<Address>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() disabled: boolean = false;
    @Input() required: boolean = false;

    private addressGroup: FormGroup;
    private get postcodeControl(): FormControl {
        return <FormControl>this.addressGroup.controls['postcode'];
    }
    private get streetControl(): FormControl {
        return <FormControl>this.addressGroup.controls['street'];
    }
    private get cityControl(): FormControl {
        return <FormControl>this.addressGroup.controls['city'];
    }

    constructor(private addressFormBuilder: AddressFormBuilder) {}

    ngOnInit() {
        this.addressGroup = this.addressFormBuilder.build(this.address, {
            required: this.required
        });
        this.addressGroup.valueChanges.forEach((value: any) => {
            this.addressChange.emit(new Address(value));
            this.validityChange.emit(this.addressGroup.valid);
        });
    }

    ngOnChanges(changes: any) {
        if (changes.disabled) {
            if (this.disabled) {
                this.addressGroup.disable();
            } else {
                this.addressGroup.enable();
            }
        }

        if (isDefined(this.addressGroup) && changes.address) {
            var address = changes.address.currentValue;
            this.streetControl.setValue(address.street);
            this.cityControl.setValue(address.city);
            this.postcodeControl.setValue(address.postcode);
        }
    }

    private propChanged(prop: string, value: any) {
        this.addressChange.emit(
            <Address>this.address.set(prop, value)
        );
    }
}
