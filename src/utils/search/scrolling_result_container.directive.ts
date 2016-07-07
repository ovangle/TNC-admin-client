import {List} from 'immutable';
import {
    Directive, Input, Host, OnInit, ChangeDetectorRef, ElementRef, HostListener
} from '@angular/core';

import {Search, SearchResult} from 'caesium-model/manager';

@Directive({
    selector: 'ul[csSearch]',
    exportAs: 'result'
})
export class ResultContainer<T> implements OnInit {
    @Input('csSearch') search: Search<T>;

    loading: boolean;

    get items(): List<T> {
        return this.search.result.items;
    }

    constructor(
        @Host() private elementRef: ElementRef,
        private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.loadNextResultPage();
    }

    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        console.log('host scroll');
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
        if (this.hasPendingResults && this.lastRowVisible) {
            this.loading = true;
            this.changeDetector.markForCheck();
            return this.search.result.loadNextPage().forEach((_) => {
                if (this.hasPendingResults && this.lastRowVisible) {
                    return this.loadNextResultPage();
                }

                this.loading = false;
                return this.changeDetector.markForCheck();
            });
        }
        return Promise.resolve(null);
    }
}

