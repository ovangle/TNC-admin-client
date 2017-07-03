import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InputsModule} from 'utils/inputs';

import {AddressModule} from '../address';
import {ResidentialStatusDisplay} from './residential_status_display.component';
import {ResidentialStatusInput} from './residential_status_input.component';

@NgModule({
    imports: [
        CommonModule,

        InputsModule,
        AddressModule
    ],
    declarations: [
        ResidentialStatusDisplay,
        ResidentialStatusInput
    ],
    exports: [
        ResidentialStatusDisplay,
        ResidentialStatusInput
    ]
})
export class ResidentialStatusModule {}
