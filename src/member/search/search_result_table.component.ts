import {List} from 'immutable';

import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    ViewChildren, QueryList, ElementRef, OnInit
} from '@angular/core';
import {SearchResult} from 'caesium-model/manager';

import {Spinner} from '../../utils/spinner/spinner.component';

import {Member} from '../member.model';
import {MemberResultTableRow} from './result_table/row.component';

@Component({
    selector: 'search-result-table',
    template: `
    <div class="table-head">
        <member-result-table-row [colHeader]="true">
        </member-result-table-row>
    </div>
    <div class="table-body" (scroll)="bodyScroll($event)">
        <ul class="list-unstyled">
            <li #tableRow class="table-row" *ngFor="let item of result.items.toArray()">
                <member-result-table-row [item]="item">
                </member-result-table-row>
            </li>
        </ul>
        <div class="table-row loading" *ngIf="!result.hasLastPage && _lastRowVisible">
            <spinner size="1.2rem"></spinner> Loading...
        </div>
    </div>
    `,
    directives: [MemberResultTableRow, Spinner],
    host: {'(window:resize)': '_onHostResize($event)'},
    styles: [`
    div.table-body {
        height: calc(100% - 35px); 
    }    
    div.loading {
        background-color: #f8f8f8;
        text-align: center;
        vertical-align: center;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'src/member/search/result_table/result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTable implements OnInit {
    @Input() result: SearchResult<Member>;
    @ViewChildren('tableRow') tableRows: QueryList<ElementRef>;

    private _elementRef: ElementRef;
    private _changeDetector: ChangeDetectorRef;

    constructor(
        changeDetector: ChangeDetectorRef,
        elementRef: ElementRef
    ) {
        this._changeDetector = changeDetector;
        this._elementRef = elementRef;
    }

    ngOnInit() {
        this._loadNextResultPage();
    }


    get _lastRowVisible(): boolean {
        if (!this.tableRows || this.tableRows.length === 0) {
            return true;
        }
        var lastRow = this.tableRows.last;
        var thisBottom = this._elementRef.nativeElement.getBoundingClientRect().bottom;
        var lastRowTop = lastRow.nativeElement.getBoundingClientRect().top;

        return thisBottom >= lastRowTop;
    }


    _loadNextResultPage(): Promise<any> {
        return this.result.loadNextPage().forEach((result) => {
            if (result !== this.result) {
                this.result = result;
                this._changeDetector.markForCheck();
            }
        }).then((_) => {
            if (!this.result.hasLastPage && this._lastRowVisible) {
                return this._loadNextResultPage();
            }
            return null;
        });
    }

    bodyScroll(event: Event) {
        if (this._lastRowVisible) {
            this._changeDetector.markForCheck();
            this._loadNextResultPage();
        }
    }

    _onHostResize(event: Event) {
        if (this._lastRowVisible) {
            this._changeDetector.markForCheck();
            this._loadNextResultPage();
        }
    }

}
