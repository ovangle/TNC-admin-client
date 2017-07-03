import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {Member} from '../member.model';

import {FILE_NOTE_SEVERITY_VALUES} from './severity';

import {FileNote, fileNote} from './file_note.model';
import {FileNoteManager} from './file_note.manager';


@Component({
    selector: 'file-note-create',
    template: `
    <style>
    :host {
        display: block;
    }
    enum-select2 {
        margin-right: 30px;
    }  
    </style>
    <form [formGroup]="fileNoteForm" (submit)="save($event)">
        <div class="form-group">
            <label for="message-input" class="sr-only">Message</label> 
            <textarea id="message-input" class="form-control" 
                  formControlName="message" 
                  [ngModel]="fileNote.message">
            </textarea>
        </div>
        <div class="layout horizontal">
            <enum-select2
                class="flex"
                [enumValues]="severityValues"
                formControlName="severity"
                [ngModel]="fileNote.severity">
            </enum-select2>
            <div class="form-group">
            <button type="submit" class="btn btn-primary">
                <i class="fa fa-save"></i> Save
            </button>
            </div>
        </div>
    </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNoteCreate {
    private severityValues = FILE_NOTE_SEVERITY_VALUES;

    @Input() member: Member;
    @Output() create = new EventEmitter<FileNote>();

    fileNote: FileNote;
    fileNoteForm: FormGroup;
    message: FormControl;

    constructor(
        private fileNoteManager: FileNoteManager,
        private formBuilder: FormBuilder,
        private _cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.fileNote = fileNote({member: this.member});
        this.fileNoteForm = this.formBuilder.group({
            'severity': [this.fileNote.severity, Validators.required],
            'message': [this.fileNote.message, Validators.required]
        });
        this.fileNoteForm.valueChanges.forEach((value: any) => {
            this.fileNote = <FileNote>this.fileNote
                .set('severity', value.severity)
                .set('message', value.message);
        });
    }

    ngOnChanges(changes: any) {
        if (changes.member && this.fileNote) {
            this.fileNote = <FileNote>this.fileNote
                .set('member', changes.member.currentValue);
        }
    }

    save(event: Event) {
        event.preventDefault();
        this.fileNoteManager.save(this.fileNote)
            .forEach((note: FileNote) => {
                this.create.emit(note);
                this.fileNote = fileNote({member: this.member});
                this._cd.markForCheck();
            })
            .catch((response: HttpResponse) => {
                if (response.status === 400) {
                    //Handle bad request
                }
                throw response;
            });
    }
}
