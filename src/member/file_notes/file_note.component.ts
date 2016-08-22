import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,
    Input, Output, EventEmitter} from "@angular/core";
import {DatePipe} from "@angular/common"
import {ROUTER_DIRECTIVES} from "@angular/router";

import {NamePipe} from '../basic';
import {FileNoteManager} from './file_note.manager';
import {FileNote} from './file_note.model';

@Component({
    selector: 'file-note',
    template: `
    <style>:host { 
        display: block; 
        position: relative;
    }
    .edit-buttons {
        position: absolute;
        top: 5px; right: 0;
        width: 30px; 
        text-align: center; 
        opacity: 0.6;
    }
    .fa.fa-thumb-tack {
        transition: 0.5s ease-in-out;
    }
    .thumb-tack-pinned {
        transform: rotate(45deg);
        opacity: 0.8;
    }
    .filenote-body {
        max-width: 80%;
    }
    .footer-item {
        white-space: nowrap; 
    }
    </style>
    <div class="alert"
         [ngClass]="{
            'alert-info': fileNote.severity === 'INFO',
            'alert-warning': fileNote.severity === 'WARNING',
            'alert-danger': fileNote.severity === 'DANGER'
         }"> 
        
        <div class="row">
            <span class="edit-buttons layout vertical" *ngIf="!isStatic">
                <span class="close" (click)="_remove()">
                    <i class="fa fa-close"></i>
                </span>
                <span class="close" (click)="togglePinned()">
                    <i class="fa fa-thumb-tack" 
                       [ngClass]="{ 'thumb-tack-pinned': fileNote.pinned }"></i>
                </span>
            </span> 
            
            <div class="filenote-body col-xs-10">
                <p>{{fileNote.message}}</p> 
            </div>
            
            <div class="filenote-footer col-xs-12"> 
                <span class="footer-item">
                    <a [routerLink]="['/admin/staff', fileNote.staffId]">{{fileNote.staff.name | name}}</a>
                </span>
                <span class="footer-item">
                    {{fileNote.created | date:'medium'}}
                </span>
            </div>
        </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    pipes: [DatePipe, NamePipe],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/flex.css',
        '../../../assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNoteComponent {
    @Input() fileNote: FileNote;

    /**
     * If `true`, the pin and remove buttons are not displayed.
     */
    @Input() isStatic: boolean;
    @Output() pin = new EventEmitter<FileNote>();
    @Output() remove = new EventEmitter<any>();

    constructor(
        private fileNoteManager: FileNoteManager,
        private _cd: ChangeDetectorRef
    ) { }

    private togglePinned() {
        var updated = <FileNote>this.fileNote.set('pinned', !this.fileNote.pinned);
        this.fileNoteManager.save(updated).forEach((fileNote) => {
            this.fileNote = fileNote;
            this.pin.emit(fileNote);
            this._cd.markForCheck();
        });
    }

    private _remove() {
        this.fileNoteManager.remove(this.fileNote.id).forEach(_ => {
            this.remove.emit(true)
        });
    }
}
