import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {InputsModule} from 'utils/inputs';
import {NameModule} from '../name';
import {AddressModule} from '../address';

import {IncomeDisplay} from './income_display.component';
import {IncomeInput} from './income_input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        InputsModule,

        NameModule,
        AddressModule
    ],
    declarations: [
        IncomeDisplay,
        IncomeInput
    ],
    exports: [
        IncomeDisplay,
        IncomeInput
    ]
})
export class IncomeModule {}
