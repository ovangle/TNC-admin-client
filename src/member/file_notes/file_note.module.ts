import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {DateModule} from 'utils/date';
import {InputsModule} from 'utils/inputs';
import {SearchModule} from 'utils/search';
import {SpinnerModule} from 'utils/spinner';

import {NameModule} from '../basic/name';

import {FileNoteManager} from './file_note.manager';
import {FileNoteComponent} from './file_note.component';
import {FileNoteCreate} from './file_note_create.component';
import {FileNoteSearch} from './file_note_search.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,

        DateModule,
        NameModule,
        InputsModule,
        SearchModule,
        SpinnerModule
    ],
    providers: [
        FileNoteManager
    ],
    declarations: [
        FileNoteComponent,
        FileNoteCreate,
        FileNoteSearch
    ],
    exports: [
        FileNoteComponent,
        FileNoteCreate,
        FileNoteSearch
    ]
})
export class MemberFileNoteModule {

}
