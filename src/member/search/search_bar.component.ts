import {Set, List} from 'immutable';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    OnInit, ChangeDetectorRef, provide, OnDestroy
} from "angular2/core";
import {NgControl} from "angular2/common";
import {ModelHttp, Search, SearchResult, ManagerOptions} from 'caesium-model/manager';

import {MemberHttp} from '../member_http';
import {Member, MemberManager} from '../member.model';

import {SearchResultDropdown} from './search_result_dropdown.component';
import {SearchResultTable} from "./search_result_table.component";

@Component({
    selector: 'member-search-bar',
    template: `
        <form>
        <div class="input-group">
            <span class="input-group-addon" id="search-icon">
                <i class="fa fa-search"></i>  
            </span>
            <input type="text" class="form-control" 
                [ngModel]="_rawSearch"
                (ngModelChange)="_rawSearchChange($event)">
        </div>    
        </form>
        
        
        <!--
        <div *ngIf="resultDisplay === 'DROPDOWN'">
            <search-result-dropdown [result]="result">
            </search-result-dropdown>
        </div>
        
        <div *ngIf="resultDisplay === 'TABLE'" class="result-table-container">
            <search-result-table [result]="result"></search-result-table>
        </div>
        
        <div *ngIf="!resultDisplayTypes.contains(resultDisplay)">
            No result display set ({{resultDisplay}})
        </div>
        -->
    `,
    directives: [SearchResultDropdown, SearchResultTable],
    providers: [
        //TODO: Remove. Should only need to provide MemberManager
        provide(ModelHttp, {useClass: MemberHttp}),
        ManagerOptions,
        MemberManager
    ],
    styles: [`
    :host { 
        display: block;
    } 
    
    .result-table-container {
        margin-top: 2rem;
        height: calc(100% - (34px + 2rem));
    }
    
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
        'assets/css/bootstrap.css',
        'assets/css/flex.css'

    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchBarComponent implements OnDestroy {
    resultDisplayTypes = Set<string>(['DROPDOWN', 'TABLE']);

    @Input() resultDisplay:string;

    name: NgControl;

    search:Search<Member>;

    resultChange: Observable<SearchResult<Member>>;

    _memberManager:MemberManager;
    _changeDetector:ChangeDetectorRef;

    constructor(memberManager:MemberManager, changeDetector:ChangeDetectorRef) {
        this._memberManager = memberManager;
        this._changeDetector = changeDetector;

        var resultChange = new Subject<SearchResult<Member>>();
        this.search = memberManager.search();
        this.search.resultChange.subscribe(resultChange);

        this.resultChange = resultChange;
    }

    ngOnDestroy() {
        console.log('Search.onDestroy');
        this.search.dispose();
    }

    _rawSearchChange(value:string) {
        var searchComponents = value.split(/\s+/).filter((component) => !!component);
        console.log(searchComponents);

        var idSearch = List<string>(searchComponents.filter((component) => !!component.match(/^\d+$/)));
        if (idSearch.isEmpty()) {
            this.search.deleteParamValue('id');
        } else {
            this.search.setParamValue('id', idSearch.first());
        }

        var nameSearch = Set<string>(searchComponents.filter((component) => !component.match(/^\d+$/)));
        this.search.setParamValue('name', nameSearch);
    }
}

