import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    OnInit, OnDestroy, ElementRef,
    ChangeDetectorRef
} from '@angular/core';

import {MouseEventsOutsideElement} from '../events/mouse_events_outside_element.service';

@Component({
    selector: 'dropdown',
    template: `
    <style>
    :host { 
        position: relative;
        display: block;
    }
    div.dropdown-menu {
        display: block;
        padding: 0;
        //overflow: hidden;
    }    
    div.dropdown-full-width {
        width: 100%;
    }    
    </style>
    <div class="dropdown-menu" *ngIf="active">
        <ng-content></ng-content>
    </div>
    `,
    providers: [MouseEventsOutsideElement],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dropdown implements OnInit, OnDestroy {
    @Input() active: boolean;
    /**
     * Should the dropdown be aligned to the right of the parent?
     */
    @Input() alignRight: boolean = false;
    /**
     * Should the dropdown extend to the full width of the container?
     * @type {boolean}
     */
    @Input() fullWidth: boolean = false;

    @Output() closeRequest = new EventEmitter<void>();

    _clickOutsideDropdown: Subscription;
    _keypressEvent: Subscription;

    private _element: ElementRef;

    constructor(
        private _cd: ChangeDetectorRef,
        private mouseEventsOutsideElement: MouseEventsOutsideElement,
        element: ElementRef) {
        this._element = element;
    }

    ngAfterViewInit() {
        var elem1 = (this.mouseEventsOutsideElement as any).elementRef.nativeElement;
        var elem2 = this._element.nativeElement;
        console.log('Is same element ref', elem1, elem2, elem1 === elem2);
        this.active = true;
    }

    ngOnInit() {
        this._clickOutsideDropdown =  this.mouseEventsOutsideElement.onMousedown.subscribe((event: MouseEvent) => {
            this.closeRequest.emit(null);
        });
        this._clickOutsideDropdown = Observable.fromEvent(document, 'mousedown')
            .filter((event: MouseEvent) => {
                var host = this._element.nativeElement;
                return (event as any).path.every((elem: Node) => elem !== host)
            }).subscribe((event) => this.closeRequest.emit(null));

        this._keypressEvent = Observable.fromEvent(document, 'keyup')
            .filter((event: KeyboardEvent) => {
                return event.which === 27 /* esc */
                    || event.which === 13 /* enter */
                    || event.which === 9 /* tab */;
            }).subscribe((event) => this.closeRequest.emit(null));

    }

    ngOnDestroy() {
        console.log('dropdown on destroy');
        if (!this._clickOutsideDropdown.closed) {
            this._clickOutsideDropdown.unsubscribe();
        }
        if (!this._keypressEvent.closed) {
            this._keypressEvent.unsubscribe();
        }

    }

    open() {
        this.active = true;
        this._cd.markForCheck();
    }

    close() {
        this.active = false;
        this._cd.markForCheck();
    }

    toggle() {
        this.active = !this.active;
        this._cd.markForCheck();

    }
}
