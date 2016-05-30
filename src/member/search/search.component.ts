import {Set, List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    OnInit, ChangeDetectorRef
} from "angular2/core";
import {NgControl} from "angular2/common";
import {Search, SearchResult} from 'caesium-model/manager';

import {Member, MemberManager} from '../member.model';

import {SearchResultDropdown} from './search_result_dropdown.component';
import {SearchResultTable} from "./search_result_table.component";

@Component({
    selector: 'member-search',
    template: `
        <form>
        <div class="input-group">
            <span class="input-group-addon" id="search-icon">
                <i class="fa fa-search"></i>  
            </span>
            <input type="text" class="form-control" 
                [ngModel]="_rawSearch"
                (ngModelChange)="_rawSearchChange($event)"
                ngControl="name">
        </div>    
        </form>
        
        <!-- TODO: Search should be a directive -->
        
        <div *ngIf="resultDisplay === 'DROPDOWN'">
            <search-result-dropdown 
                #results
                [response]="response"
                [selection]="selection"
                (selectionChange)="selectionChange.emit($event)">
            </search-result-dropdown>
        </div>
        
        <div *ngIf="resultDisplay === 'TABLE'" class="result-table-container">
            <search-result-table [result]="result"></search-result-table>
        </div>
        
        <div *ngIf="!resultDisplayTypes.contains(resultDisplay)">
            No result display set ({{resultDisplay}})
        </div>
    `,
    directives: [SearchResultDropdown, SearchResultTable],
    providers: [MemberManager],
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
export class MemberSearchComponent implements OnInit {
    resultDisplayTypes = Set<string>(['DROPDOWN', 'TABLE']);

    @Input() selection:Member;
    @Output() selectionChange = new EventEmitter<Member>();

    @Input() resultDisplay:string;

    name: NgControl;

    search:Search<Member>;
    result: SearchResult<Member>;

    _memberManager:MemberManager;
    _changeDetector:ChangeDetectorRef;

    constructor(memberManager:MemberManager, changeDetector:ChangeDetectorRef) {
        this._memberManager = memberManager;
        this._changeDetector = changeDetector;
    }

    ngOnInit() {
        this.search = this._memberManager.search();
        this.search.setParamValue('name', Set<string>());
        this.result = this.search.result;
        this._changeDetector.markForCheck();
    }

    ngOnChanges(changes: any) {
        if (changes['name']) {
            console.log('name', changes['name'].currentValue);
        }
    }

    _rawSearchChange(value:string) {
        var searchComponents = value.split(/\s+/).filter((component) => !!component);
        console.log(searchComponents);

        var idSearch = List<string>(searchComponents.filter((component) => !!component.match(/^\d+$/)));
        this.search.setParamValue('id', idSearch.isEmpty() ? undefined : idSearch.first());

        var nameSearch = Set<string>(searchComponents.filter((component) => !component.match(/^\d+$/)));
        this.search.setParamValue('name', nameSearch);

        this.result = this.search.result;
        this._changeDetector.markForCheck();
    }
}

