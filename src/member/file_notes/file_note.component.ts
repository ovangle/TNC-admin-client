

import {Component} from "angular2/core";

import {FileNote} from './file_note.record';

@Component({
    selector: 'file-note',
    template: `
    `,
    styles: [`
    :host { display: block; }
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ]
})
export class FileNoteComponent {
    fileNote: FileNote;

}
