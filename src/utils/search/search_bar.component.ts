import {Map, Set} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {Search} from 'caesium-model/manager';
import {ParameterBuilder} from './parameter_builder.service';

@Component({
    selector: 'search-bar',
    template: `
    <div class="input-group">
        <span class="input-group-addon" id="search-icon">
            <i class="fa fa-search"></i> 
        </span>
            
        <input type="text" class="form-control"
               [ngModel]="_rawSearch"
               (ngModelChange)="_rawSearchChange($event)">
    </div>
    `,
    directives: [],
    styles: [`
    :host { display: block; }
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
    @Output() paramValuesChange = new EventEmitter<Map<string,any>>();

    constructor(private _paramBuilder: ParameterBuilder) {}

    _searchFragments(rawSearch: string) {
        return Set<string>(rawSearch.split(/\W+/));
    }

    _rawSearchChange(value: string) {
        this.paramValuesChange.emit(
            this._paramBuilder.buildParamValues(this._searchFragments(value))
        );
    }
}