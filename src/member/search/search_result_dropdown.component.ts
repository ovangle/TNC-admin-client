import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
} from 'angular2/core';

import {SearchResult} from 'caesium-model/manager';
import {Dropdown} from '../../layout/dropdown.component';

import {Member} from '../member.model';

@Component({
    selector: 'search-result-dropdown',
    template: `
        <dropdown [active]="active" [fullWidth]="true">
            <ul class="list-unstyled">
                <li *ngFor="#item of responseItems">
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
export class SearchResultDropdown {
    @Input() active: boolean = true;

    @Input() selection:Member;
    @Output() selectionChange = new EventEmitter<Member>();

    @Input() result: SearchResult<Member>;

    get responseItems(): List<Member> {
        return this.result? this.result.items : List<Member>();
    }

}
