import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NamePipe} from './name.pipe';
import {NameInput} from './name_input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        NamePipe,
        NameInput
    ],
    exports: [
        NamePipe,
        NameInput
    ]
})
export class NameModule {}
