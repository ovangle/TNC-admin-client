import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {List} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    OnInit, OnDestroy, ElementRef
} from "angular2/core";
@Component({
    selector: 'dropdown',
    template: `
        <div class="dropdown-menu" [ngClass]="{
            'dropdown-menu-right': alignRight,
            'dropdown-full-width': fullWidth
       }"
             *ngIf="active">
            <content></content>
        </div>
    `,
    styles: [`
    :host { 
        position: relative;
        display: block;
    }
    div.dropdown-menu {
        display: block;
        padding: 0;
        overflow: hidden;
    }    
    div.dropdown-full-width {
        width: 100%;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
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

    _subscriptions = List<Subscription>();

    private _element: ElementRef;

    constructor(element: ElementRef) {
        this._element = element;
    }

    ngOnInit() {
        var clickOutsideDropdown = Observable.fromEvent(document, 'mousedown')
            .filter((event: MouseEvent) => {
                var host = this._element.nativeElement;
                return (event as any).path.every((elem: Node) => elem !== host)
            }).subscribe((event) => this.closeRequest.emit(null));

        var closeKeypress = Observable.fromEvent(document, 'keyup')
            .filter((event: KeyboardEvent) => {
                return event.which === 27 /* esc */
                    || event.which === 13 /* enter */
                    || event.which === 9 /* tab */;
            }).subscribe((event) => this.closeRequest.emit(null));

        this._subscriptions = this._subscriptions.push(
            clickOutsideDropdown,
            closeKeypress
        );
    }

    ngOnDestroy() {
        this._subscriptions
            .filter((subscription) => !subscription.isUnsubscribed)
            .forEach((subscription) => subscription.unsubscribe());
    }
}
