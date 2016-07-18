import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef, OnChanges, SimpleChange
} from '@angular/core';

import {StateException} from 'caesium-model/exceptions';
import {SearchResult} from 'caesium-model/manager';
import {Dropdown} from '../../utils/layout/dropdown.component';

import {Member} from '../member.model';
import {NamePipe} from '../basic';

@Component({
    selector: 'member-search-dropdown',
    template: `
        <dropdown [active]="active" [fullWidth]="true">
            <ul class="list-unstyled">
                <li *ngFor="let item of result.items.toArray()"
                    [ngClass]="{'selected': item.id === selection.id}"
                    (click)="select(item)">
                    {{item.id}}: {{item.name | name}}
                </li>
            </ul>
        </dropdown>
    `,
    directives: [Dropdown],
    pipes: [NamePipe],
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
 
    li.selected {
        background-color: blue;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultDropdown implements OnChanges {
    @Input() selection: Member;
    @Output() selectionChange = new EventEmitter<Member>();

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
            });
        }
    }

    select(item: Member) {
        this.selectionChange.emit(item);
    }

}
