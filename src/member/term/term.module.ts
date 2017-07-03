import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipesModule} from 'utils/pipes';

import {MemberTermDisplay} from './term_display.component';

@NgModule({
    imports: [
        CommonModule,
        PipesModule
    ],
    declarations: [
        MemberTermDisplay
    ],
    exports: [
        MemberTermDisplay
    ]
})
export class MemberTermModule {}
