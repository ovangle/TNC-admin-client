import {Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import {ROUTER_DIRECTIVES} from '@angular/router';
import {Search} from 'caesium-model/manager';
import {SearchBar, ParameterBuilder} from '../utils/search';

import {Member} from './member.model';
import {MemberManager} from './member.manager';

import {MemberSearchParameterBuilder} from './search/parameter_builder.service';
import {MemberSearchResultTable} from './search/result_table.component';


@Component({
    selector: 'member-search-page',
    template: `
    <div class="search-bar-container layout horizontal">
        <search-bar
            (paramValuesChange)="paramValuesChanged($event)">
        </search-bar>    
        <a class="btn btn-primary" [routerLink]="['./create']">
            <i class="fa fa-plus"></i> Signup
        </a>    
    </div>    
    <member-search-result-table class="search-results" [search]="search">
    </member-search-result-table>
    `,
    directives: [SearchBar, ROUTER_DIRECTIVES, MemberSearchResultTable],
    providers: [
        MemberManager,
        {provide: ParameterBuilder, useClass: MemberSearchParameterBuilder}
    ],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css',
        'assets/css/flex.css',
        'assets/css/search_page.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchPage {
    private search: Search<Member>;

    constructor(
        private memberManager: MemberManager,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.search = this.memberManager.search();
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
