import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CapitalizeFirstPipe} from './capitalize_first.pipe';
import {MoneyPipe} from './money_pipe';
import {OrElsePipe} from './or_else.pipe';
import {PhoneNumberPipe} from './phone_number.pipe';
import {YesNoPipe} from './yes_no.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CapitalizeFirstPipe,
        MoneyPipe,
        OrElsePipe,
        PhoneNumberPipe,
        YesNoPipe
    ],
    exports: [
        CapitalizeFirstPipe,
        MoneyPipe,
        OrElsePipe,
        PhoneNumberPipe,
        YesNoPipe
    ]
})
export class PipesModule {}
