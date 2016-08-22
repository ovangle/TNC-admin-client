import {Iterable, List} from 'immutable';

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
    <style>
    :host {
        display: block;
    }
    </style>
    <div class="table-body">
        <ul class="list-unstyled" [csSearch]="search" #result="result">
            <li *ngFor="let localNote of _local.toArray(); let i=index">
                <file-note [fileNote]="localNote" 
                           (pin)="pin.emit($event)"
                           [isStatic]="pinned"></file-note>
            </li>
            <li *ngFor="let note of result.items.toArray(); let i=index">
                <file-note [fileNote]="note"
                           (pin)="pin.emit($event)"
                           [isStatic]="pinned"></file-note> 
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
    styleUrls: [
        '../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNoteSearch {
    private _local = List<FileNote>();

    // Search parameters
    @Input() member: Member;
    @Input() pinned: boolean = false;

    @Output() pin = new EventEmitter<FileNote>();

    private search: Search<FileNote>;

    constructor(
        private fileNoteManager: FileNoteManager,
        private _cd: ChangeDetectorRef
    ) {
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

    get notes(): Iterable.Indexed<FileNote> {
        return this._local.concat(this.search.result.items).toIndexedSeq();
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
