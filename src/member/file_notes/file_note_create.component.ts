import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder} from '@angular/forms';

import {FileNote} from './file_note.model';
import {FileNoteManager} from './file_note.manager';

import {FileNoteSeveritySelect} from './severity';


@Component({
    selector: 'file-note-create',
    template: `
    <form (ngSubmit)="save()">
        <filenote-severity-select 
            [label]="'Severity'"
            [severity]="note.severity"
            (severityChange)="propChanged('severity', $event)"
            formControlName="severity">
        </filenote-severity-select>
        
        <textarea class="form-control" 
                  formControlName="message">
        </textarea>
    </form>
    `,
    directives: [
        FileNoteSeveritySelect,
        REACTIVE_FORM_DIRECTIVES
    ],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileNoteCreate {
    note: FileNote;

    constructor(
        private fileNoteManager: FileNoteManager,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.note = this.fileNoteManager.create(FileNote, {});
    }

    private propChanged(prop: string, value: any) {
        this.note = <FileNote>this.note.set(prop, value);
    }

    save() {

    }
}
