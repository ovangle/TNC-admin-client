import {Set} from 'immutable';

import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import {Search} from 'caesium-json/manager';
import {ParameterBuilder} from '../utils/search';

import {Member} from './member.model';
import {MemberManager, MEMBER_SEARCH_PARAMS} from './member.manager';

import {MemberSearchParameterBuilder} from './search/parameter_builder.service';

@Component({
    selector: 'member-search-page',
    template: `
    <div class="search-bar-container layout horizontal">
        <search-bar
            (paramValuesChange)="paramValuesChanged($event)">
        </search-bar>    
        <a class="btn btn-primary" [routerLink]="['./signup']">
            <i class="fa fa-plus"></i> Signup
        </a>    
    </div>    
    <member-search-result-table class="search-results" [search]="search">
    </member-search-result-table>
    `,
    providers: [
        {provide: ParameterBuilder, useClass: MemberSearchParameterBuilder}
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchPage {
    private search: Search<Member>;

    constructor(
        private memberManager: MemberManager,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.search = this.memberManager.search(MEMBER_SEARCH_PARAMS);
        this.changeDetector.markForCheck();
    }

    private paramValuesChanged(paramValues: Map<string,any>) {
        var idParam = paramValues.get('id');
        if (idParam !== this.search.getParamValue('id'))
            this.search.setParamValue('id', idParam);

        var nameParam = paramValues.get('name') as Set<string>;
        if (!nameParam || !nameParam.equals(this.search.getParamValue('name')))
            this.search.setParamValue('name', nameParam);
    }
}
