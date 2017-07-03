import {Set} from 'immutable';

import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {Search} from 'caesium-json/manager';
import {ParameterBuilder} from 'utils/search';

import {StaffMember} from './staff.model';
import {StaffManager, STAFF_MEMBER_SEARCH_PARAMS} from './staff.manager';
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
    providers: [
        {provide: ParameterBuilder, useClass: StaffSearchParameterBuilder}
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffSearchPage {
    private search: Search<StaffMember>;

    constructor(
        private staffManager: StaffManager,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.search = this.staffManager.search(STAFF_MEMBER_SEARCH_PARAMS);
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
