import {Subscription} from 'rxjs/Subscription';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnDestroy, ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';

import {ModalDialog} from './modal_dialog.model';
import {ModalDialogService} from './modal_dialog.service';

@Component({
    selector: 'modal-dialog',
    template: `
    <div #modal class="modal" tabindex="-1" *ngIf="activeDialog !== null">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close"
                            (click)="dismissModal(false)">
                        <i class="fa fa-close"></i>         
                    </button>
                    <h4 class="modal-title">{{activeDialog.title}}</h4>         
                </div> 
                <div class="modal-body" [innerHTML]="activeDialog.bodyHTML"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary"
                        (click)="dismissModal(true)">OK</button>
            </div>
        </div>
    </div>
    <div class="modal-backdrop" *ngIf="activeDialog !== null"
         (mouseup)="dismissModal()">
    </div>
    `,
    directives: [],
    styles: [`
    :host > div.modal {
        display: block;
    }
    
    div.modal-backdrop {
        opacity: 0.1;
    }    
    
    `],
    styleUrls: [
       'assets/css/bootstrap.css',
        'assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialogComponent implements OnDestroy {
    private _serviceSubscription: Subscription;

    @ViewChild('modal') modal: ElementRef;
    activeDialog: ModalDialog = null;

    dismiss = new EventEmitter<boolean>();
    private _viewInit: boolean = false;

    constructor(
        private modalDialogService: ModalDialogService,
        private changeDetector: ChangeDetectorRef
    ) {
        this._serviceSubscription = modalDialogService.dialogChange.subscribe(dialog => {
            console.log('activate modal ', dialog.title);
            this.activeDialog = dialog;
            this.changeDetector.markForCheck();
        });
        modalDialogService.registerModalDialog(this);
    }

    ngAfterViewInit() {
        this._viewInit = true;
        if (this.activeDialog) {
            this.modal.nativeElement.focus();
        }
    }

    ngOnDestroy() {
        if (!this._serviceSubscription.isUnsubscribed) {
            this._serviceSubscription.unsubscribe();
        }
    }

    dismissModal(confirm: boolean) {
        this.activeDialog = null;
        this.dismiss.emit(confirm)
    }
}
