import 'rxjs/add/observable/fromEventPattern';

import {List, Set} from 'immutable';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {
    Directive, Input, Host, OnChanges, ChangeDetectorRef, ElementRef, HostListener,
    Renderer, AfterViewInit, OnInit, OnDestroy
} from '@angular/core';

import {isDefined} from 'caesium-core/lang';
import {StateException} from 'caesium-model/exceptions';
import {Search, SearchResult} from 'caesium-model/manager';

@Directive({
    selector: 'ul[csSearch]',
    exportAs: 'result',
    host: {
        '[style.overflowY]': 'auto',
        '(scroll)': 'loadNextResultPage()'
    }
})
export class ResultContainer<T> implements OnChanges, AfterViewInit, OnInit, OnDestroy {
    @Input('csSearch') search: Search<T>;

    loading: boolean;
    private _windowResized: Subscription;

    get items(): List<T> {
        return this.search.result.items;
    }

    constructor(
        @Host() private elementRef: ElementRef,
        private changeDetector: ChangeDetectorRef,
        private renderer: Renderer
    ) { }

    ngOnInit() {
        this.search.resultChange.forEach((_) => {
            this.changeDetector.markForCheck();
        });
    }

    ngAfterViewInit() {
        var remover: Function;
        var windowResize = Observable.fromEventPattern(
            (handler: Function) => {
                remover = this.renderer.listenGlobal('window', 'resize', handler)
            },
            (handler: Function) => {
                remover();
            }
        );

        this._windowResized = windowResize.debounceTime(200).subscribe(evt => {
            this.loadNextResultPage();
        });
    }

    ngOnDestroy() {
        if (!this._windowResized.isUnsubscribed) {
            this._windowResized.unsubscribe();
        }
    }


    ngOnChanges(changes: any) {
        if (changes.search) {
            this.loadNextResultPage();
        }
    }

    /**
     * `true` if the last result row is scrolled into view.
     * Recurses to parent nodes, in case the scroll isn't directly
     * declared on the immediate parent container.
     *
     * @returns {boolean}
     */
    get lastRowVisible(): boolean {
        var containerElem = this.elementRef.nativeElement;
        var rows = List<Element>(containerElem.querySelectorAll('li'));
        if (rows.isEmpty())
            return true;
        var lastRow = rows.last();

        var rowRect = lastRow.getBoundingClientRect();

        // console.log(`row top: ${rowRect.top}, row bottom: ${rowRect.bottom}`);
        do {
            let containerRect = containerElem.getBoundingClientRect();
            //console.log(`\tcontainer top: ${containerRect.top} container bottom: ${containerRect.bottom}`);

            if (rowRect.top >= containerRect.bottom)
                return false;


            containerElem = containerElem.parentNode;
        } while (isDefined(containerElem.getBoundingClientRect));
        //console.log('\tdocument clientHeight', document.documentElement.clientHeight);
        return rowRect.top < document.documentElement.clientHeight;
    }

    get hasPendingResults(): boolean {
        return !this.search.result.hasLastPage;
    }

    loadNextResultPage(): Promise<any> {
        if ((this.hasPendingResults && this.lastRowVisible)) {
            this.loading = true;
            this.changeDetector.markForCheck();
            return this.search.result.loadNextPage().forEach((_) => {
                console.log('last row visible: ', this.lastRowVisible);
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

