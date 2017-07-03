import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEventPattern';

import {
    Inject, forwardRef,
    Directive,
    Output, EventEmitter,
    Renderer, ElementRef, ContentChildren, QueryList
} from '@angular/core';

@Directive({
    selector: '[scrollContent]',
    host: {
        '(scroll)': 'containerCheckResize()'
    }
})
export class ScrollContent {
    private _onScroll: Subscription;

    constructor(
        @Inject(forwardRef(() => ScrollContainer)) private scrollContainer: any,
        private renderer: Renderer,
        private elementRef: ElementRef
    ) {}

    getBoundingClientRect(): ClientRect {
        return this.elementRef.nativeElement.getBoundingClientRect();
    }

    ngAfterViewInit() {
        let removeEventListener: Function;
        this._onScroll = Observable.fromEventPattern(
            (handler) => {
                removeEventListener = this.renderer.listen(this.elementRef.nativeElement, 'scroll', handler);
            },
            (handler) => {
                removeEventListener();
            }).debounceTime(200)
            .subscribe(event => {
                this.scrollContainer.checkScrollPosition();
            });

    }

    ngOnDestroy() {
        if (!this._onScroll.closed) {
            this._onScroll.unsubscribe();
        }
    }
}


@Directive({
    selector: '[scrollContainer]',
    host: {
        '[style.overflowY]': '"auto"',
        '(scroll)': 'checkScrollPosition()'
    }
})
export class ScrollContainer {
    private _onWindowResize: Subscription;
    private _contentChanges: Subscription;

    @ContentChildren(ScrollContent) scrollContent: QueryList<ScrollContent>;

    // Emits an event when the bottom of the scroll content becomes visible
    @Output() scrollBottom = new EventEmitter<any>();
    // Emits an event when the top of the scroll content becomes visible
    @Output() scrollTop = new EventEmitter<any>();

    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        let removeEventHandler: Function;
        this._onWindowResize = Observable.fromEventPattern(
            (handler: Function) => {
                removeEventHandler = this.renderer.listenGlobal('window', 'resize', handler);
            },
            (handler: Function) => removeEventHandler()
        )   .debounceTime(200)
            .subscribe(evt => {
                this.checkScrollPosition();
            });

        this._contentChanges = this.scrollContent.changes.subscribe(changes => {


        });
    }

    ngOnDestroy() {
        if (!this._onWindowResize.closed) {
            this._onWindowResize.unsubscribe();
        }
        if (!this._contentChanges.closed) {
            this._contentChanges.unsubscribe();
        }
    }

    checkScrollPosition() {
        var containerElem = this.elementRef.nativeElement;
        let containerRect = containerElem.getBoundingClientRect();

        let scrollContents = this.scrollContent.toArray();
        if (scrollContents.length === 0) {
            this.scrollTop.emit(true);
            this.scrollBottom.emit(true);
            return;
        }

        let firstContent = scrollContents[0];
        let firstContentRect = firstContent.getBoundingClientRect();
        if (firstContentRect.top >= containerRect.top) {
            this.scrollTop.emit(true);
        }

        let lastContent = scrollContents[scrollContents.length - 1];
        let lastContentRect = lastContent.getBoundingClientRect();
        if (lastContentRect.bottom <= containerRect.bottom) {
            this.scrollBottom.emit(true);
        }
    }

}



