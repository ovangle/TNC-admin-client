import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import {isDefined, isBlank} from 'caesium-core/lang';
import {Search} from 'caesium-model/manager';

import {Spinner} from '../../utils/spinner/spinner.component';
import {ResultContainer} from '../../utils/search';

import {Member} from '../member.model';
import {FileNote} from './file_note.model';
import {FileNoteComponent} from './file_note.component';
import {FileNoteManager} from './file_note.manager';


@Component({
    selector: 'file-note-search',
    template: `
    <div class="table-body">
        <ul class="list-unstyled">
            <li *ngFor="let note of inserted.toArray()">
                <file-note [fileNote]="note"></file-note> 
            </li> 
        </ul>
        <ul class="list-unstyled" [csSearch]="search" #result="result">
            <li *ngFor="let note of result.items.toArray()">
                <file-note [fileNote]="note"></file-note> 
            </li>
        </ul>
        <div class="loading" *ngIf="result.loading">
            <spinner size="1.2rem"></spinner> Loading...
        </div>
    </div> 
    `,
    directives: [
        FileNoteComponent,
        ResultContainer,
        Spinner
    ],
    providers: [FileNoteManager],
    styles: [`
    :host {
        display: block;
    }
    `],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNoteSearch {
    @Input() inserted: List<FileNote>;

    // Search parameters
    @Input() member: Member;
    @Input() pinned: boolean = false;

    private search: Search<FileNote>;

    constructor(
        private fileNoteManager: FileNoteManager,
        private _cd: ChangeDetectorRef
    ) {
        this.inserted = List<FileNote>();
        this.fileNoteManager = fileNoteManager;
        this.search = fileNoteManager.search();
    }


    ngOnChanges(changes: any) {
        if (changes.member
            && !isBlank(changes.member.currentValue)
            && !isBlank(changes.member.currentValue.id)) {
            this.search.setParamValue('member', changes.member.currentValue.id);
        }
        if (changes.pinned) {
            this.search.setParamValue('pinned', changes.pinned.currentValue);
        }
    }

    resetSearch() {
        var search = this.search.reset();
        if (!isBlank(this.member))
            search.setParamValue('member', this.member.id);
        search.setParamValue('pinned', this.pinned);
        this.search = search;
        this._cd.markForCheck()
    }
}
