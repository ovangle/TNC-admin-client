import {Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {SearchBar, ParameterBuilder} from '../../../utils/search';
import {Dropdown} from '../../../utils/layout/dropdown.component';

import {PartnerSearch} from './partner_search.component';
import {PartnerParameterBuilder} from './partner_search_parameter_builder.service';

@Component({
    selector: 'partner-search-dropdown',
    template: `
        <search-bar (paramValuesChange)="paramValues=$event"></search-bar>
        <dropdown [active]="dropdownActive"
                  (closeRequest)="active=false">
            <partner-search [paramValues]="paramValues"></partner-search> 
        </dropdown>
    `,
    directives: [SearchBar, PartnerSearch, Dropdown],
    providers: [
        {provide: ParameterBuilder, useClass: PartnerParameterBuilder}
    ],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerSearchDropdown {
    private dropdownActive: boolean = true;
    private paramValues: {id: string, name: Set<string>};

    constructor() {
        this.paramValues = {id: '', name: Set<string>()};
    }
}
