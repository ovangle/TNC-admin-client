import {Map, Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {Search} from 'caesium-model/manager';

import {ParameterBuilder, SearchBar} from '../../../utils/search';
import {StaffSearchParameterBuilder} from './staff_search_parameter_builder.service';

import {StaffMember} from '../staff.model';
import {StaffManager} from '../staff.manager';

import {StaffSearchResultTable} from './result_table/result_table.component';

@Component({
    selector: 'staff-search',
    template: `
        <div class="layout horizontal" class="search-bar-container">
            <search-bar class="flex" (paramValuesChange)=_paramValuesChanged($event)></search-bar>
            <div class="btn-group">
                <a class="btn btn-default" [routerLink]="'./staff/create'">Add staff</a> 
            </div>
        </div>
        <staff-search-result-table [search]="search"></staff-search-result-table>
    `,
    directives: [
        SearchBar,
        StaffSearchResultTable,
        ROUTER_DIRECTIVES
    ],
    providers: [
        StaffManager,
        {provide: ParameterBuilder, useClass: StaffSearchParameterBuilder}
    ],
    styleUrls: [
        'assets/css/flex.css',
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffSearch {
    search: Search<StaffMember>;

    constructor(
        private staffManager: StaffManager,
        private changeDetector: ChangeDetectorRef
    ) { }

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
