import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CheckboxArray} from './checkbox_array.component';
import {OtherSelect} from './other_select.component';
import {PhoneInput} from './phone_input.component';
import {YesNoSelect} from './yesno_select.component';
import {EnumSelect2} from './enum_select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CheckboxArray,
        OtherSelect,
        PhoneInput,
        YesNoSelect,
        EnumSelect2
    ],
    exports: [
        CheckboxArray,
        OtherSelect,
        PhoneInput,
        YesNoSelect,
        EnumSelect2
    ]
})
export class InputsModule {}
