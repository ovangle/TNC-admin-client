import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ResultContainer} from './scrolling_result_container.directive';
import {SearchBar} from './search_bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ResultContainer,
        SearchBar
    ],
    exports: [
        ResultContainer,
        SearchBar
    ]
})
export class SearchModule {}
