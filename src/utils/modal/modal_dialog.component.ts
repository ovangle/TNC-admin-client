import {Subscription} from 'rxjs/Subscription';

import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation,
    Output, EventEmitter, ViewChild, ViewContainerRef
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {ModalOptions, ModalState} from './modal_options.model';
import {Modal} from './modal.service';
import {ModalDialogContent} from './components/content.component';

/**
 * A modal
 */
@Component({
    selector: 'modal-dialog',
    template: `
    <div class="backdrop" [ngClass]="{'open': open}"></div>
    <div class="modal-dialog">
        <modal-dialog-content *ngIf="open" 
            [vcRef]="vcRef"
            [options]="options"
            (stateChange)="stateChange.emit($event)">
        </modal-dialog-content>
    </div>
    `,
    directives: [ModalDialogContent],
    styles: [`
    :host {
        position: fixed;
        width: 100vw;
        z-index: 1000;
        top: 0;
        left: 0;
    }
    .backdrop {
        position: fixed;
        visibility: hidden;
        background-color: #fff;
        transition: visibility 0s, background-color 0.3s ease;
    }    
    .backdrop.open {
        visibility: visible;
        height: 100vh;
        width: 100vw;
        background-color: #000;
        opacity: 0.2;
    }    
    `],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialog {
    /// The dialog options
    options: ModalOptions;

    @Output() stateChange = new EventEmitter<ModalState>();

    private _modalActivation: Subscription;
    @ViewChild(ModalDialogContent) content: ModalDialogContent;


    constructor(
        private changeDetector: ChangeDetectorRef,
        private context: Modal) {
        context.registerDialogComponent(this);
    }

    get open(): boolean {
        return !isBlank(this.options);
    }

    markForCheck() {
        this.changeDetector.markForCheck();
    }

}

