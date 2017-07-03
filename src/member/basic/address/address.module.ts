import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AddressFormBuilder} from './address.form';
import {AddressPipe} from './address.pipe';
import {AddressInput} from './address_input.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        AddressPipe,
        AddressInput
    ],
    providers: [
        AddressFormBuilder
    ],
    exports: [
        AddressPipe,
        AddressInput
    ]
})
export class AddressModule {}
