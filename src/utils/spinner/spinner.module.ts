import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Spinner} from './spinner.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Spinner
    ],
    exports: [
        Spinner
    ]
})
export class SpinnerModule {}
