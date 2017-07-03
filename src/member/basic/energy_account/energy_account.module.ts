import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {InputsModule} from 'utils/inputs';

import {NameModule} from '../name';
import {AddressModule} from '../address';

import {EnergyAccountDisplay} from './energy_account_display.component';
import {EnergyAccountInput} from './energy_account_input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        InputsModule,

        NameModule,
        AddressModule
    ],
    declarations: [
        EnergyAccountDisplay,
        EnergyAccountInput
    ],
    exports: [
        EnergyAccountDisplay,
        EnergyAccountInput
    ]

})
export class EnergyAccountModule {}
