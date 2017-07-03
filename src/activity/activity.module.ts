import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {PipesModule} from 'utils/pipes';
import {SpinnerModule} from 'utils/spinner';
import {LayoutModule} from 'utils/layout';

import {NameModule} from 'member/basic/name';

import {VoucherModule} from './voucher/voucher.module';

import {ActivityManager} from './activity.manager';
import {ActivitySearchResultTable} from './search/result_table.component';
import {ActivitySearchResultTableRow} from './search/result_table_row.component';
import {ActivitySearchResultTableRowHeaders} from './search/result_table_row_headers.component';

import {MemberActivitySearchPage} from './search_page.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        LayoutModule,
        PipesModule,
        SpinnerModule,

        NameModule,

        VoucherModule
    ],
    providers: [
        ActivityManager
    ],
    declarations: [
        ActivitySearchResultTable,
        ActivitySearchResultTableRow,
        ActivitySearchResultTableRowHeaders,
        MemberActivitySearchPage
    ]
})
export class ActivityModule {}
