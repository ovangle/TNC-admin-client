import {Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import {Search} from 'caesium-model/manager';
import {SearchBar, ParameterBuilder} from '../utils/search';
import {Dropdown} from '../utils/layout/dropdown.component';

import {Member} from './member.model';
import {MemberManager} from './member.manager';

import {MemberSearchResultTable} from './search/result_table.component';
import {MemberSearchParameterBuilder} from './search/parameter_builder.service';

@Component({
    selector: 'member-select',
    template: `
    <search-bar 
        (paramValuesChange)="paramValuesChanged($event)"
        (focus)="_dropdownActive= true"
    ></search-bar>
    <dropdown [active]="_dropdownActive" [fullWidth]="true"
              (closeRequest)="_dropdownActive = false">
        <member-search-result-table 
            [isDropdown]="true"
            [search]="search"
            (rowClick)="selectMember($event)"
        ></member-search-result-table>
    </dropdown>
    `,
    directives: [
        SearchBar, Dropdown, MemberSearchResultTable
    ],
    providers: [
        MemberManager,
        {provide: ParameterBuilder, useClass: MemberSearchParameterBuilder}
    ],
    styles: [`
    dropdown {
        width: 100%;
    }    
    member-search-result-table {
        height: 200px;
    }    
    
    `],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSelect {
    private search: Search<Member>;

    private _dropdownActive = false;

    @Input() member: Member;
    @Output() memberChange = new EventEmitter<Member>();

    constructor(
        private memberManager: MemberManager,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.search = this.memberManager.search();
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
}
