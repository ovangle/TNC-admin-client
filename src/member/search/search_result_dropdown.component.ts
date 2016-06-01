import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef, OnChanges, SimpleChange
} from 'angular2/core';

import {StateException} from 'caesium-model/exceptions';
import {SearchResult} from 'caesium-model/manager';
import {Dropdown} from '../../layout/dropdown.component';

import {Member} from '../member.model';

@Component({
    selector: 'member-search-result-dropdown',
    template: `
        <dropdown [active]="active" [fullWidth]="true">
            <ul class="list-unstyled">
                <li *ngFor="#item of result.items.toArray()">
                    {{item.id}}: {{item.firstName}} {{item.lastName}}
                </li>
            </ul>
        </dropdown>
    `,
    directives: [Dropdown],
    styles: [`
    :host {
        display: block;
    }
    
    ul.list-unstyled {
        width: 100%;
        
        max-height: 25rem;
        overflow-y: auto;
        margin-bottom: 0;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultDropdown implements OnChanges {
    @Input() active: boolean = true;
    @Input() result: SearchResult<Member>;

    _changeDetector: ChangeDetectorRef;

    constructor(changeDetector: ChangeDetectorRef) {
        this._changeDetector = changeDetector;
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['result']) {
            var result: SearchResult<Member> = changes['result'].currentValue;
            result.loadNextPage().forEach((result) => {
                this.result = result;
                this._changeDetector.markForCheck();
            }, this);
        }
    }

}
