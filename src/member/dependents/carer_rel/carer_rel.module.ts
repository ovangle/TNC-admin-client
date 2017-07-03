import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InputsModule} from 'utils/inputs';
import {NameModule} from '../../basic/name';

import {CarerRelDisplay} from './carer_rel_display.component';
import {CarerRelInput} from './carer_rel_input.component';

@NgModule({
    imports: [
        CommonModule,
        InputsModule,
        NameModule
    ],
    declarations: [
        CarerRelDisplay,
        CarerRelInput
    ],
    exports: [
        CarerRelDisplay,
        CarerRelInput
    ]
})
export class MemberDependentCarerRelModule {}


