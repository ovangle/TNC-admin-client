import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef
} from "@angular/core";

import {OnActivate, CanDeactivate, RouteSegment, RouteTree} from '@angular/router';

import {Search, SearchResult} from 'caesium-model/manager';

import {Member} from '../member.model';
import {MemberManager} from '../member.manager';
import {MemberSearchBarComponent} from "./search_bar.component";
import {SearchResultTable} from "./search_result_table.component";

@Component({
    selector: 'member-search',
    template: `
        <member-search-bar [search]="search"></member-search-bar>
        <search-result-table [result]="result"></search-result-table>
    `,
    directives: [MemberSearchBarComponent, SearchResultTable],
    styles: [`
    :host {
        display: block;
        height: 100%;
    }    
    
    member-search-bar {
        margin-bottom: 10px;
    }    
    
    search-result-table {
        display: block;
        height: calc(100% - 44px);
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchComponent implements OnActivate, CanDeactivate {

    _memberManager: MemberManager;
    _changeDetector: ChangeDetectorRef;

    search: Search<Member>;
    result: SearchResult<Member>;

    constructor(memberManager: MemberManager, changeDetector: ChangeDetectorRef) {
        this._memberManager = memberManager;
        this._changeDetector = changeDetector;
    }

    routerOnActivate(routeSegment: RouteSegment) {
        console.log('router on activate');
        this.search = this._memberManager.search();
        this.result = this.search.result;
        this._changeDetector.markForCheck();
        
        this.search.resultChange.subscribe((result) => {
            console.log('got result');
            this.result = result;
            this._changeDetector.markForCheck();
        });
    }

    routerCanDeactivate(currTree?:RouteTree, futureTree?:RouteTree):Promise<boolean> {
        this.search.dispose();
        return Promise.resolve(true);
    }
}
