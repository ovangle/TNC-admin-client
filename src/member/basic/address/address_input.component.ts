import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {REACTIVE_FORM_DIRECTIVES, FormGroup, AbstractControl} from '@angular/forms';

import {Address} from './address.model';
import {AddressFormBuilder} from './address.form';

@Component({
    selector: 'address-input',
    template: `
    <label>Address</label>
    <div class="layout horizontal" [formGroup]="addressGroup">
        <div class="form-group flex-4">
            <label for="street-input" class="sr-only">Street</label> 
            <input type="text" class="form-control"  id="street-input"
                   [placeholder]="'Street'"
                   [disabled]="disabled"
                   formControlName="street">
        </div>   
    
        <div class="form-group flex input-right">
              
            <input type="text" class="form-control" id="city-input"
                [placeholder]="'City'"
                [disabled]="disabled"
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
                [disabled]="disabled"
                formControlName="postcode">
            <span class="help-block" 
                  *ngIf="postcodeControl.touched && postcodeControl.errors?.pattern">
                  Invalid postcode
            </span>     
            <span class="help-block"
                  *ngIf="postcodeControl.touched && postcodeControl.errors?.required">
                A value is required       
            </span>
                <!--
                [ngModel]="address.postcode"
                (ngModelChange)="propChanged('postcode', $event)">
                -->
        </div>
    </div>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES],
    providers: [AddressFormBuilder],
    styles: [`
    .input-right {
        margin-left: 30px;
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
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() disabled: boolean = false;
    @Input() required: boolean = false;

    private addressGroup: FormGroup;
    private get postcodeControl(): AbstractControl {

        return this.addressGroup.controls['postcode'];
    }
    private get streetControl(): AbstractControl {
        return this.addressGroup.controls['street'];
    }
    private get cityControl(): AbstractControl {
        return this.addressGroup.controls['city'];
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

    private propChanged(prop: string, value: any) {
        this.addressChange.emit(
            <Address>this.address.set(prop, value)
        );
    }
}
