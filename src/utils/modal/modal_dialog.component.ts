
import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef, Type, Injector
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';
import {Modal} from './modal.service';

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
    <div class="modal-dialog" *ngIf="isOpen">
        <ng-container 
            *ngComponentOutlet="component; injector: injector">
        </ng-container>
    </div>
    `,
    styles: [`
    .modal-body {
        overflow: auto;
        max-height: 70vh;
    }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialog {
    private component: Type<any>;
    private injector: Injector;

    constructor(
        private _cd: ChangeDetectorRef,
        private modal: Modal
    ) {
        modal.registerDialogComponent(this);
    }

    get isOpen(): boolean {
        return !isBlank(this.component);
    }

    close() {
        this.component = this.injector = null;
        this._cd.markForCheck();
    }

    open(component: Type<any>, injector: Injector) {
        this.component = component;
        this.injector = injector;
        this._cd.markForCheck();
    }
}

