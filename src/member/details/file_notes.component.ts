import {Component} from '@angular/core';


import {MemberContext} from '../member_context.service';
import {FileNote} from '../file_notes';

@Component({
    selector: 'member-file-notes',
    template: `
    <style>
    :host {
        display: block;
        padding-top: 10px;
    } 
    </style>
    <div *ngIf="memberContext.member | async as member">
        <file-note-create 
            [member]="member"
            (create)="noteAdded($event)">
        </file-note-create> 
        <file-note-search [member]="member" 
                (pin)="notePinned($event)"></file-note-search>
    </div>
    `,
})
export class MemberFileNotes {
    constructor(private memberContext: MemberContext) {}

    /*
    notePinned(fileNote: FileNote) {
        let pinnedNotes = this.memberDetailsPage.pinnedNotes;
        let reset: boolean = false;
        reset = reset || (fileNote.pinned && pinnedNotes.notes.every(note => note.id !== fileNote.id));
        reset = reset || (!fileNote.pinned && pinnedNotes.notes.some(note => note.id === fileNote.id));

        if (reset) {
            pinnedNotes.resetSearch();
        }

    }
    */
}
