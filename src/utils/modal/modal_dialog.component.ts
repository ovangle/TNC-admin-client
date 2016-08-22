import {Subscription} from 'rxjs/Subscription';

import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation,
    Output, EventEmitter, ViewChild, ViewContainerRef
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {ModalOptions} from './modal_options.model';
import {Modal} from './modal.service';
import {ModalDialogContent} from './components/content.component';

/**
 * A modal
 */
@Component({
    selector: 'modal-dialog',
    template: `
    <style>
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
    </style>
    <div class="backdrop" [ngClass]="{'open': isOpen}"></div>
    <div class="modal-dialog">
        <modal-dialog-content *ngIf="isOpen" [options]="options">
        </modal-dialog-content>
    </div>
    `,
    directives: [ModalDialogContent],
    styleUrls: [
        '../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialog {
    /// The dialog options
    options: ModalOptions;

    private _modalActivation: Subscription;
    @ViewChild(ModalDialogContent) content: ModalDialogContent;


    constructor(
        private changeDetector: ChangeDetectorRef,
        private context: Modal
    ) {
        context.registerDialogComponent(this);
    }

    get isOpen(): boolean {
        return !isBlank(this.options);
    }

    close() {
        this.options = null;
        this.markForCheck();
    }

    markForCheck() {
        this.changeDetector.markForCheck();
    }

}

