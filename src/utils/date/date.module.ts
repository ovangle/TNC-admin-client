import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LayoutModule} from '../layout/layout.module';

import {CalendarMonth} from './month_picker/calendar_month.component';
import {CurrentDateDisplay} from './month_picker/current_date_display.component';
import {DatePicker} from './month_picker/date_picker.component';
import {MonthInput} from './month_picker/month_input.component';
import {YearInput} from './month_picker/year_input.component';
import {DateInput} from './date_input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        LayoutModule
    ],
    declarations: [
        DateInput,
        CalendarMonth,
        CurrentDateDisplay,
        DatePicker,
        MonthInput,
        YearInput
    ],
    exports: [
        DateInput
    ]
})
export class DateModule {

}
