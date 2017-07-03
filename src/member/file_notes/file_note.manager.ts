import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';

import {Type, isBlank} from 'caesium-core/lang';
import {identityConverter} from 'caesium-core/converter';
import {getEncoder} from 'caesium-core/codec';
import {date} from 'caesium-json/json_codecs';
import {ManagerBase, SearchParameter, ManagerOptions} from 'caesium-json/manager';
import {FileNote} from './file_note.model';

@Injectable()
export class FileNoteManager extends ManagerBase<FileNote> {
    constructor(options: ManagerOptions) {
        super(FileNote, options);
    }

    getModelSubtypes(): Type<any>[] { return []; }


    save(fileNote: FileNote): Observable<FileNote> {
        if (isBlank(fileNote.id)) {
            var request = this._requestFactory.post('', this.modelCodec);
            request.setRequestBody(fileNote);
            return request.send().handle({select: 201, decoder: this.modelCodec});
        } else {
            var request = this._requestFactory.put(fileNote.id, this.modelCodec);
            request.setRequestBody(fileNote);
            return request.send().handle({select: 200, decoder: this.modelCodec});
        }
    }

    remove(fileNote: FileNote): Observable<any> {
        if (isBlank(fileNote.id)) {
            return Observable.of(true);
        }
        var request = this._requestFactory.delete(fileNote.id);
        return request.send()
            .handle({select: 200, decoder: this.modelCodec});
    }
}

export const FILE_NOTE_SEARCH_PARAMS = [
    {
        name: 'member',
        encoder: identityConverter,
        accessor: (fileNote: FileNote) => fileNote.memberId
    },
    {
        name: 'staff',
        encoder: identityConverter,
        accessor: (fileNote: FileNote) => fileNote.staffId
    },
    {
        name: 'pinned',
        encoder: identityConverter,
        accessor: (fileNote: FileNote) => fileNote.pinned
    },
    {
        name: 'created_before',
        encoder: getEncoder(date),
        accessor: (fileNote: FileNote) => fileNote.created,
        matcher: (modelValue: Date, paramValue: Date) => {
            return modelValue < paramValue
        },
        refiner: (previousValue: Date, currentValue: Date) => {
            return previousValue >= currentValue;
        }
    },
    {
        name: 'created_after',
        encoder: getEncoder(date),
        accessor: (fileNote: FileNote) => fileNote.created,
        matcher: (modelValue: Date, paramValue: Date) => {
            return modelValue > paramValue;
        },
        refiner: (previousValue: Date, currentValue: Date) => {
            return previousValue <= currentValue;
        }
    }

];
