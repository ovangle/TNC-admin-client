import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {Dropdown} from './dropdown.component';
import {DropdownMenu, DropdownMenuItem} from './dropdown_menu.component';
import {PageHeader} from './page_header.component';
import {ScrollContainer} from './scroll_container';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        Dropdown,
        DropdownMenu,
        DropdownMenuItem,
        PageHeader,
        ScrollContainer
    ],
    exports: [
        Dropdown,
        DropdownMenu,
        DropdownMenuItem,
        PageHeader,
        ScrollContainer
    ]
})
export class LayoutModule {}
