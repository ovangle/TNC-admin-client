import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {InputsModule} from 'utils/inputs';
import {PipesModule} from 'utils/pipes';

import {ContactDisplay} from './contact_display.component';
import {ContactInput} from './contact_input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        PipesModule,
        InputsModule

    ],
    declarations: [
        ContactDisplay,
        ContactInput
    ],
    exports: [
        ContactDisplay,
        ContactInput
    ]
})
export class ContactModule {}
