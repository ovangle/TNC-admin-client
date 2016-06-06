import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef, SimpleChange
} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import {isDefined} from 'caesium-core/lang';
import {Search, SearchResult} from 'caesium-model/manager';

import {Member} from '../../member.model';
import {MemberManager} from '../../member.manager';
import {NamePipe} from '../../basic';

import {MemberSearchBarComponent} from "../../search/search_bar.component";
import {SearchResultDropdown} from '../../search/search_result_dropdown.component';

import {PartnerInput} from '../partner_input.component';
import {MemberPartner} from './member_partner.model';


@Component({
    selector: 'member-partner-details',
    template: `
    <div *ngIf="!!(partner.member.id)">
        <div>
            <a [routerLink]="['/member', partner.member.id]">{{partner.name | name}}</a>
            <button>Change</button><button>Remove</button>
        </div>
        
        <partner-input [partner]="_resolvedPartner"
                       (partnerChange)="partnerChange.emit($event)"
                       [disabled]="disabled">
        </partner-input>
    </div>
        
    <div *ngIf="!(partner.member.id)">
        <member-search-bar (resultChange)="_searchResultChange($event)">
        </member-search-bar>

        <member-search-result-dropdown
                [selection]="partner.member"
                (selectionChange)="_selectionChanged($event)"
                [result]="_result">
        </member-search-result-dropdown>
    </div>
    `,
    directives: [
        PartnerInput, MemberSearchBarComponent, SearchResultDropdown,
        ROUTER_DIRECTIVES
    ],
    pipes: [NamePipe],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberPartnerDetails {
    @Input() partner: MemberPartner;
    @Output() partnerChange = new EventEmitter<MemberPartner>();

    @Input() disabled: boolean;

    _resolvedPartner: MemberPartner;

    search: Search<Member>;
    private _memberManager: MemberManager;
    private _changeDetector: ChangeDetectorRef;
    private _result: SearchResult<Member>;

    constructor(
        memberManager: MemberManager,
        changeDetector: ChangeDetectorRef
    ) {
        this._memberManager = memberManager;
        this._changeDetector = changeDetector;
        this.search = this._memberManager.search();

        this._result = this.search.result;

        this.search.resultChange.subscribe((result) => {
            this._result = result;
            this._changeDetector.markForCheck();
        });
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (isDefined(this.partner)) {
            this.partner.resolveMember(this._memberManager).forEach((partner) => {
                this._resolvedPartner = partner;
            }).then((_) => this._changeDetector.markForCheck());
        }
    }

    _selectionChanged(member: Member) {
        this.partnerChange.emit(
            <MemberPartner>this.partner.set('member', member)
        );
    }
}
