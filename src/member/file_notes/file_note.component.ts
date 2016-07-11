

import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from "@angular/core";
import {DatePipe} from "@angular/common"
import {ROUTER_DIRECTIVES} from "@angular/router";

import {NamePipe} from '../basic';
import {FileNoteManager} from './file_note.manager';
import {FileNote} from './file_note.model';

@Component({
    selector: 'file-note',
    template: `
    <div class="alert"
         [ngClass]="{
            'alert-info': fileNote.severity === 'INFO',
            'alert-warning': fileNote.severity === 'WARNING',
            'alert-danger': fileNote.severity === 'DANGER'
         }"> 
    
        <div class="edit-buttons">
            <span class="close" (click)="togglePinned()">
                <i class="fa fa-thumb-tack" 
                   [ngClass]="{
                        'thumb-tack-pinned': fileNote.pinned
                   }"></i></span>
            <span class="close" (click)="delete()"><i class="fa fa-close"></i></span>
        </div>
        <p>{{fileNote.message}}</p>
    
        <a [routerLink]="['/admin/staff', fileNote.staffId]">{{fileNote.staff.name | name}}</a>
        {{fileNote.created | date:'medium'}}
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    pipes: [DatePipe, NamePipe],
    styles: [`
    :host { display: block; }
    .edit-buttons {
        width: 100%;
    }    
    .edit-buttons > .close {
        float: right; 
    }
    .fa.fa-thumb-tack {
        transition: 0.5s ease-in-out;
    }
    .thumb-tack-pinned {
        transform: rotate(45deg);
    }
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNoteComponent {
    @Input() fileNote: FileNote;

    constructor(private fileNoteManager: FileNoteManager) { }

    togglePinned() {
        var updated = <FileNote>this.fileNote.set('pinned', !this.fileNote.pinned);
        this.fileNoteManager.save(updated).forEach((fileNote) => {
            this.fileNote = fileNote;
        });
    }
}
