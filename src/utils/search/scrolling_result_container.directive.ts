import {List} from 'immutable';
import {
    Directive, Input, Host, OnChanges, ChangeDetectorRef, ElementRef, HostListener
} from '@angular/core';

import {isDefined} from 'caesium-core/lang';
import {Search, SearchResult} from 'caesium-model/manager';

@Directive({
    selector: 'ul[csSearch]',
    exportAs: 'result'
})
export class ResultContainer<T> implements OnChanges {
    @Input('csSearch') search: Search<T>;

    loading: boolean;

    get items(): List<T> {
        return this.search.result.items;
    }

    constructor(
        @Host() private elementRef: ElementRef,
        private changeDetector: ChangeDetectorRef) { }

    ngOnChanges(changes: any) {
        if (changes.search) {
            this.loadNextResultPage();
        }
    }

    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        if (this.lastRowVisible) {
            this.loadNextResultPage();
        }
    }

    get lastRowVisible(): boolean {
        var containerElem = this.elementRef.nativeElement;
        var rows = List<Element>(containerElem.querySelectorAll('li'));
        if (rows.isEmpty())
            return true;
        var lastRow = rows.last();

        var containerBottom = containerElem.getBoundingClientRect().bottom;
        var lastElemTop = lastRow.getBoundingClientRect().top;
        return containerBottom >= lastElemTop;
    }

    get hasPendingResults(): boolean {
        return !this.search.result.hasLastPage;
    }

    loadNextResultPage(): Promise<any> {
        if ((this.hasPendingResults && this.lastRowVisible)) {
            this.loading = true;
            this.changeDetector.markForCheck();
            return this.search.result.loadNextPage().forEach((_) => {
                if (this.hasPendingResults && this.lastRowVisible) {
                    return this.loadNextResultPage();
                }
                this.loading = false;
                return this.changeDetector.markForCheck();
            }).catch((err) => {
                this.loading = false;
                throw err;
            })
        }
        return Promise.resolve(null);
    }
}

