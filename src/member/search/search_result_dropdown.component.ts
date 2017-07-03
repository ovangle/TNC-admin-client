import {Observable} from 'rxjs/Observable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
    ChangeDetectorRef, OnChanges, SimpleChange
} from '@angular/core';

import {SearchResult} from 'caesium-json/manager';
import {Member} from '../member.model';


@Component({
    selector: 'member-search-dropdown',
    template: `
    <style>
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
    </style>
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchResultDropdown implements OnChanges {
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
            result.loadNextPage().forEach((result: SearchResult<Member>) => {
                this.result = result;
                this._changeDetector.markForCheck();
            });
        }
    }

    select(item: Member) {
        this.selectionChange.emit(item);
    }

}
