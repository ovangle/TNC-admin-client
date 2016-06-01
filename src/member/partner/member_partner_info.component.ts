import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {SearchResult} from 'caesium-model/manager';

import {Member} from '../member.model';
import {MemberSearchBarComponent} from "../search/search_bar.component";
import {SearchResultDropdown} from '../search/search_result_dropdown.component';
import {RouterLink} from "@angular/router-deprecated";

@Component({
    selector: 'member-partner-info',
    template: `
        <div *ngIf="member">
            <a [routerLink]="['Dashboard', 'Member', member.id]"></a>
            <button>Change</button><button>Remove</button>
        </div>
        
        <div *ngIf="!member">
            <member-search-bar [resultDisplay]="'DROPDOWN'"
                           (resultChange)="_searchResultChange($event)">
            </member-search-bar>
            
            <member-search-result-dropdown
                [result]="_result">
                
            </member-search-result-dropdown>
        </div>
    `,
    directives: [MemberSearchBarComponent, SearchResultDropdown, RouterLink],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberPartnerInfo {
    @Input() partner: Member;
    @Output() partnerChange = new EventEmitter<Member>();

    _result: SearchResult<Member>;

    searchSelectionChanged(member: Member) {

    }

    _searchResultChange(result: SearchResult<Member>) {
        console.log('new search result', result);
        this._result = result;
    }
}
