import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TimeInput} from './time_input/time_input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TimeInput
    ],
    exports: [
        TimeInput
    ]
})
export class TimeModule {}
