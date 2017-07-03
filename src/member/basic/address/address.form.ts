
import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, ValidatorFn} from '@angular/forms';

import {Address} from './address.model';

export interface AddressFormOptions {
    required: boolean;
}

@Injectable()
export class AddressFormBuilder {
    constructor(private formBuilder: FormBuilder) { }

    build(value: Address, options: AddressFormOptions): FormGroup {
        return this.formBuilder.group({
            'street': [value.street, ...streetValidators(options)],
            'city': [value.city, ...cityValidators(options)],
            'postcode': [value.postcode, postcodeValidators(options)]
        });
    }

}

function streetValidators(options: AddressFormOptions): ValidatorFn[] {

    var validators: ValidatorFn[] = [];
    if (options.required) {
        validators.push(Validators.required);
    }
    return validators;

}

function cityValidators(options: AddressFormOptions): ValidatorFn[] {
    var validators: ValidatorFn[] = [];
    if (options.required) {
        validators.push(Validators.required);
    }
    return validators;
}

function postcodeValidators(options: AddressFormOptions): ValidatorFn[] {
    var validators: ValidatorFn[] = [];
    if (options.required) {
        validators.push(Validators.required);
    }
    validators.push(Validators.pattern('^(\\d{4})?$'));
    return validators;
}
