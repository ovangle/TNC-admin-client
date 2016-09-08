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
    <style>
    :host { display: block; }
    </style>
    <div class="input-group">
        <span class="input-group-addon" id="search-icon">
            <i class="fa fa-search"></i> 
        </span>
            
        <input type="text" class="form-control"
               [ngModel]="_rawSearch"
               (ngModelChange)="_rawSearchChange.emit($event)">
    </div>
    `,
    directives: [],
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('font-awesome/css/font-awesome.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
    private _rawSearchChange = new EventEmitter<string>();

    @Output() get paramValuesChange() {
        return this._rawSearchChange
            .debounceTime(200)
            .map(value => this._paramBuilder.buildParamValues(this._searchFragments(value)));
    }

    constructor(private _paramBuilder: ParameterBuilder) {}

    _searchFragments(rawSearch: string) {
        return Set<string>(rawSearch.split(/\W+/));
    }
}
