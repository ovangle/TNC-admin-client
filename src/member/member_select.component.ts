import {Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import {Search} from 'caesium-json/manager';
import {ParameterBuilder} from '../utils/search';

import {Member} from './member.model';
import {MemberManager, MEMBER_SEARCH_PARAMS} from './member.manager';
import {MemberSearchParameterBuilder} from './search/parameter_builder.service';

@Component({
    selector: 'member-select',
    template: `
    <style>
    dropdown {
        width: 100%;
    }    
    member-search-result-table {
        height: 200px;
    }  
    </style>
    <div class="form-group">
        <label *ngIf="label" class="control-label">{{label}}</label>
        <div *ngIf="member" class="layout horizontal">
            <member-card class="flex" 
                    [member]="member" 
                    [isRemovable]="true"
                    (remove)="clearSelection()"></member-card>
        </div>
        <div *ngIf="!member">
            <search-bar
                (paramValuesChange)="paramValuesChanged($event)"
                (focus)="_dropdownActive= true">
            </search-bar>
                <dropdown [active]="_dropdownActive" [fullWidth]="true"
                          (closeRequest)="_dropdownActive = false">
                    <member-search-result-table 
                        [isDropdown]="true"
                        [search]="search"
                        (rowClick)="selectMember($event)">
                    </member-search-result-table>
            </dropdown>
        </div>
    </div>
    `,
    providers: [
        {provide: ParameterBuilder, useClass: MemberSearchParameterBuilder}
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSelect {
    private search: Search<Member>;

    private _dropdownActive = false;

    @Input() label: string;
    @Input() member: Member;
    @Output() memberChange = new EventEmitter<Member>();

    constructor(
        private memberManager: MemberManager,
        private changeDetector: ChangeDetectorRef
    ) { }

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

    private selectMember(member: Member) {
        this._dropdownActive = false;
        this.memberChange.emit(member);
    }

    private clearSelection() {
        this.memberChange.emit(null);
    }
}
