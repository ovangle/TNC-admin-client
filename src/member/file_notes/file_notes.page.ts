import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef, ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isDefined} from 'caesium-core/lang';

import {MemberContext} from '../details_context.service';
import {Member} from '../member.model';

import {FileNote} from './file_note.model';
import {FileNoteCreate} from './file_note_create.component';
import {FileNoteManager} from './file_note.manager';
import {FileNoteSearch} from './file_note_search.component';

@Component({
    selector: 'member-file-notes',
    template: `
    <file-note-create 
        [member]="member"
        (create)="addNote($event)">
    </file-note-create>
    <file-note-search
        [member]="member"
        [inserted]="insertedNotes">
    </file-note-search>
    `,
    styles: [`
    :host { 
        display: block; 
        height: 100%; 
        padding-right: 1.2rem;
        overflow-y: auto;
    }
    `],
    directives: [
        FileNoteCreate,
        FileNoteSearch
    ],
    providers: [FileNoteManager],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberFileNotes {
    get member(): Member { return this.context.member; }

    private insertedNotes: List<FileNote>;
    @ViewChild(FileNoteSearch) fileNotes: FileNoteSearch;

    constructor(private fileNoteManager: FileNoteManager,
                private changeDetector: ChangeDetectorRef,
                private context: MemberContext,
                private route: ActivatedRoute
    ) {
        this.insertedNotes = List<FileNote>();
    }

    ngOnInit() {
        this.route.params.forEach(params => {
            this.context.activePage = MemberFileNotes;
            if (isDefined(this.fileNotes))
                this.fileNotes.resetSearch();
            this.changeDetector.markForCheck();
        })
    }

    addNote(note: FileNote) {
        this.insertedNotes = this.insertedNotes.insert(0, note);
        this.fileNotes.resetSearch();
    }
}
