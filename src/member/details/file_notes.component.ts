import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import {MemberDetailsPage} from '../details_page.component';

import {Member} from '../member.model';
import {FileNote, FileNoteCreate, FileNoteSearch, FileNoteManager} from '../file_notes';

@Component({
    selector: 'member-file-notes',
    template: `
    <style>
    :host {
        display: block;
        padding-top: 10px;
    } 
    </style>
    <div *ngIf="member">
        <file-note-create 
            [member]="member"
            (create)="noteAdded($event)">
        </file-note-create> 
        <file-note-search [member]="member" (pin)="notePinned($event)"></file-note-search>
    </div>
    `,
    directives: [FileNoteCreate, FileNoteSearch],
    providers: [FileNoteManager],
    styleUrls: [
        '../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
})
export class MemberFileNotes {
    private member: Member;

    constructor(private memberDetailsPage: MemberDetailsPage) { }

    ngOnInit() {
        this.memberDetailsPage.member.forEach(member => {
            this.memberDetailsPage.setActivePage('FILE_NOTES');
            this.member = member;
        });
    }

    notePinned(fileNote: FileNote) {
        let pinnedNotes = this.memberDetailsPage.pinnedNotes;
        let reset: boolean = false;
        reset = reset || (fileNote.pinned && pinnedNotes.notes.every(note => note.id !== fileNote.id));
        reset = reset || (!fileNote.pinned && pinnedNotes.notes.some(note => note.id === fileNote.id));

        if (reset) {
            pinnedNotes.resetSearch();
        }

    }
}
