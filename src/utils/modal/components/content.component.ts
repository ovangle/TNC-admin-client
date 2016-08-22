import {Subscription} from 'rxjs/Subscription';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnInit, OnDestroy, ComponentRef, ElementRef, ViewChild, ViewContainerRef
} from '@angular/core';
import {COMMON_DIRECTIVES} from '@angular/common';

import {ComponentHost, RemoteComponent} from '../../component_host';

import {ModalOptions} from '../modal_options.model';
import {Modal} from '../modal.service';
import {MouseEventsOutsideElement} from '../../events/mouse_events_outside_element.service';



@Component({
    selector: 'modal-dialog-content',
    template: `
    <style>
    :host { display: block; }
    </style>
    <div class="modal-content">
        <div [csSource]="options.remote" 
             [csType]="options.body" 
             [csBindings]="options.bindings">
        </div>
    </div>
    `,
    directives: [COMMON_DIRECTIVES, ComponentHost],
    providers: [
        MouseEventsOutsideElement
    ],
    styleUrls: [
        '../../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialogContent implements OnInit, OnDestroy {
    @Input() options: ModalOptions;
    @Output() confirm = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();

    get isBlocking(): boolean { return this.options.isBlocking; }


    @ViewChild('insertionPoint') private insertionPoint: ElementRef;

    private _contentRef: ComponentRef<any>;
    private outsideMouseClick: Subscription;

    constructor(
        private mouseEvents: MouseEventsOutsideElement
    ) {}

    ngOnInit() {
        if (!this.isBlocking) {
            this.outsideMouseClick = this.mouseEvents.onClick.subscribe((_) => {
                if (this.options.isBlocking) {
                    console.log('should close modal');
                    this.cancel.emit(null);
                }
            });
        }
    }

    ngOnChanges(changes: any) {
        debugger;
    }

    ngOnDestroy() {
        if (this.outsideMouseClick && !this.outsideMouseClick.isUnsubscribed) {
            this.outsideMouseClick.unsubscribe();
        }
        this._contentRef.destroy();
    }
}
