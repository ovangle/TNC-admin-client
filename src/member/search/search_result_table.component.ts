import {List} from 'immutable';

import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    OnChanges, SimpleChange
} from '@angular/core';
import {SearchResult} from 'caesium-model/manager';

import {Member} from '../member.model';
import {MemberResultTableRow} from './result_table/row.component';

@Component({
    selector: 'search-result-table',
    template: `
    <div class="table-head">
        <member-result-table-row [colHeader]="true">
        </member-result-table-row>
    </div>
    <div class="table-body">
        <ul class="list-unstyled">
            <li class="table-row" *ngFor="#item of result.items.toArray()">
                <member-result-table-row [item]="item">
                </member-result-table-row>
            </li>
        </ul>
    </div>
    `,
    directives: [MemberResultTableRow],
    styles: [`
    :host {
        height: 100%;
        display: block;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'src/member/search/result_table/result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTable implements OnChanges {
    @Input() result: SearchResult<Member>;

    private _changeDetector: ChangeDetectorRef;

    constructor(changeDetector: ChangeDetectorRef) {
        this._changeDetector = changeDetector;
    }

    ngOnInit() {
        console.log('initial result: ', this.result);
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        console.log('result: ', changes['result']);
        if (changes['result']) {
            var result: SearchResult<Member> = changes['result'].currentValue;
            result.loadNextPage().subscribe((result) => {
                this.result = result;
                this._changeDetector.markForCheck();
            })
        }
    }


}
