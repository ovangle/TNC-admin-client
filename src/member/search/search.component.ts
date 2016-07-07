import {Set} from 'immutable';

import {Subscription} from 'rxjs/Subscription';
import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef
} from "@angular/core";
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {Search, SearchResult} from 'caesium-model/manager';

import {SearchBar, ParameterBuilder} from '../../utils/search';

import {Member} from '../member.model';
import {MemberManager} from '../member.manager';
import {MemberSearchParameterBuilder} from './search_parameter_builder.service';
import {MemberSearchResultTable} from "./result_table/result_table.component";

@Component({
    selector: 'member-search',
    template: `
        <div class="layout horizontal search-bar-container">
            <search-bar class="flex" (paramValuesChange)="_paramValuesChanged($event)" ></search-bar>
            <a class="btn btn-primary" [routerLink]="['./signup']">Sign up</a>
        </div>
        
        <member-search-result-table [search]="search"></member-search-result-table>
    `,
    directives: [SearchBar, MemberSearchResultTable, ROUTER_DIRECTIVES],
    providers: [
        MemberManager,
        {provide: ParameterBuilder, useClass: MemberSearchParameterBuilder}
    ],
    styles: [`
    :host {
        display: block;
        height: 100%;
    }    
    
    search-bar {
        margin-right: 1.5rem;
    }    
    
    .search-bar-container {
        margin-left: 10%;
        width: 80%;
        margin-bottom: 10px;
    }    
    
    member-search-result-table {
        display: block;
        height: calc(100% - 44px);
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/flex.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchComponent {

    search:Search<Member>;

    constructor(private memberManager:MemberManager,
                private changeDetector:ChangeDetectorRef,
                private route:ActivatedRoute) {
    }

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

