import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DateModule} from 'utils/date';
import {InputsModule} from 'utils/inputs';

import {NameModule} from '../basic/name';

import {MemberDependentCarerRelModule} from './carer_rel';

import {DependentManager} from './dependent.manager';
import {DependentCard} from './dependent_card.component';
import {DependentDisplay} from './dependent_display.component';
import {DependentListDisplay} from './dependent_list_display.component';
import {DependentInput} from './dependent_input.component';
import {DependentListInput} from './dependent_list_input.component';

@NgModule({
    imports: [
        CommonModule,
        DateModule,
        NameModule,
        InputsModule,

        MemberDependentCarerRelModule
    ],
    providers: [
        DependentManager
    ],
    declarations: [
        DependentCard,
        DependentDisplay,
        DependentListDisplay,
        DependentInput,
        DependentListInput
    ],
    exports: [
        DependentCard,
        DependentDisplay,
        DependentListDisplay,
        DependentInput,
        DependentListInput
    ]
})
export class MemberDependentModule {}
