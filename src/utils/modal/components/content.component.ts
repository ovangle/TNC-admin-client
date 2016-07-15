import {Subscription} from 'rxjs/Subscription';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnInit, OnDestroy, ComponentRef, ElementRef, ViewChild, ViewContainerRef
} from '@angular/core';
import {COMMON_DIRECTIVES} from '@angular/common';

import {ComponentHost, RemoteComponent} from '../../component_host';

import {ModalOptions, ModalType, ModalState} from '../modal_options.model';
import {Modal} from '../modal.service';
import {MouseEventsOutsideElement} from '../../events/mouse_events_outside_element.service';

@Component({
    selector: 'modal-dialog-content',
    template: `
    <div class="modal-content">
        <div class="modal-header"><h4>{{title}}</h4></div>
        <div [csSource]="options.remote" 
             [csType]="options.body" 
             [csBindings]="options.bindings"></div>
        <div class="modal-footer">
            <button class="btn btn-primary"
                    (click)="confirmChange.emit('CONFIRM')">
                OK
            </button>
            <button *ngIf="type === 'PROMPT'" 
                    class="btn btn-default"
                    (click)="confirmChange.emit('REJECT')">
                Cancel
            </button>
        </div>
    </div>
    `,
    directives: [COMMON_DIRECTIVES, ComponentHost],
    providers: [
        MouseEventsOutsideElement
    ],
    styles: [`
    :host { display: block; }
    `],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialogContent implements OnInit, OnDestroy {
    @Input() options: ModalOptions;
    @Output() stateChange = new EventEmitter<ModalState>();

    get type(): ModalType { return this.options.type; }
    get title(): string { return this.options.title; }
    get isBlocking(): boolean { return this.options.isBlocking; }


    @ViewChild('insertionPoint') private insertionPoint: ElementRef;

    private _contentRef: ComponentRef<any>;
    private outsideMouseClick: Subscription;

    constructor(
        private context: Modal,
        private mouseEvents: MouseEventsOutsideElement
    ) {}


    ngOnInit() {
        if (!this.isBlocking) {
            this.outsideMouseClick = this.mouseEvents.onClick.subscribe((_) => {
                this.stateChange.emit('REJECT');
            });
        }
    }

    ngOnDestroy() {
        if (this.outsideMouseClick && !this.outsideMouseClick.isUnsubscribed) {
            this.outsideMouseClick.unsubscribe();
        }
        this._contentRef.destroy();
    }
}
