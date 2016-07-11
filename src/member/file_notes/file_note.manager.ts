import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';

import {Type, isBlank} from 'caesium-core/lang';
import {identityConverter} from 'caesium-core/converter';
import {getEncoder} from 'caesium-core/codec';
import {date} from 'caesium-model/json_codecs';
import {ManagerBase, SearchParameter, ManagerOptions} from 'caesium-model/manager';
import {FileNote} from './file_note.model';

@Injectable()
export class FileNoteManager extends ManagerBase<FileNote> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType(): Type { return FileNote; }
    getModelSubtypes(): Type[] { return []; }

    getSearchParameters(): SearchParameter[] {
        return [
            {
                name: 'member',
                encoder: identityConverter,
                accessor: (fileNote) => fileNote.memberId
            },
            {
                name: 'staff',
                encoder: identityConverter,
                accessor: (fileNote) => fileNote.staffId
            },
            {
                name: 'pinned',
                encoder: identityConverter,
                accessor: (fileNote) => fileNote.pinned
            },
            {
                name: 'created_before',
                encoder: getEncoder(date),
                accessor: (fileNote) => fileNote.created,
                matcher: (modelValue: Date, paramValue: Date) => {
                    return modelValue < paramValue
                },
                refiner: (previousValue, currentValue) => {
                    return previousValue >= currentValue;
                }
            },
            {
                name: 'created_after',
                encoder: getEncoder(date),
                accessor: (fileNote) => fileNote.created,
                matcher: (modelValue: Date, paramValue: Date) => {
                    return modelValue > paramValue;
                },
                refiner: (previousValue, currentValue) => {
                    return previousValue <= currentValue;
                }
            }

        ];
    }

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
}
