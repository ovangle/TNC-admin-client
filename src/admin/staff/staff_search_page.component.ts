import {Set} from 'immutable';

import {
    Component, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {Search} from 'caesium-model/manager';
import {ParameterBuilder, SearchBar} from '../../utils/search';

import {StaffMember} from './staff.model';
import {StaffManager} from './staff.manager';
import {StaffSearchResultTable} from './search/result_table.component';
import {StaffSearchParameterBuilder} from './search/parameter_builder.service';


@Component({
    selector: 'staff-search-page',
    template: `
    <div class="search-bar-container layout horizontal">
         <search-bar
            (paramValuesChange)="paramValuesChanged($event)"></search-bar>
         <a class="btn btn-primary" [routerLink]="['./create']">
            <i class="fa fa-plus"></i> New staff member
         </a>   
    </div>
    <staff-search-result-table class="search-results" [search]="search">
    </staff-search-result-table>
    `,
    directives: [SearchBar, ROUTER_DIRECTIVES, StaffSearchResultTable],
    providers: [
        StaffManager,
        {provide: ParameterBuilder, useClass: StaffSearchParameterBuilder}
    ],
    styleUrls: [
    '../../../assets/css/bootstrap.css',
    '../../../assets/css/font-awesome.css',
    '../../../assets/css/flex.css',
    '../../../assets/css/search_page.css',
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffSearchPage {
    private search: Search<StaffMember>;

    constructor(
        private staffManager: StaffManager,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.search = this.staffManager.search();
        this.changeDetector.markForCheck();
    }

    _paramValuesChanged(paramValues: Map<string,any>) {
        var idParam = paramValues.get('id');
        if (idParam !== this.search.getParamValue('id'))
            this.search.setParamValue('id', idParam);

        var nameParam = paramValues.get('name') as Set<string>;
        if (!nameParam || !nameParam.equals(this.search.getParamValue('name')))
            this.search.setParamValue('name', nameParam);
    }
}
