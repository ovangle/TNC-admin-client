

import {Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from "angular2/core";

import {Search, SearchResult} from 'caesium-model/manager';

import {Member, MemberManager} from '../member.model';
import {MemberSearchBarComponent} from "./search_bar.component";
import {SearchResultTable} from "./search_result_table.component";

@Component({
    selector: 'member-search',
    template: `
        <member-search-bar [search]="search"></member-search-bar>
        <search-result-table [result]="result"></search-result-table>
    `,
    directives: [MemberSearchBarComponent, SearchResultTable],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchComponent {
    _memberManager: MemberManager;
    _changeDetector: ChangeDetectorRef;

    search: Search<Member>;
    result: SearchResult<Member>;

    constructor(memberManager: MemberManager, changeDetector: ChangeDetectorRef) {
        this._memberManager = memberManager;
        this._changeDetector = changeDetector;
        this.search = memberManager.search();

        this.result = this.search.result;

        this.search.resultChange.subscribe((result) => {
            this.result = result;
            this._changeDetector.markForCheck();
        });
    }
    
    ngOnInit() {
        console.log('MemberSearchComponent.ngOnInit');
    }
}
