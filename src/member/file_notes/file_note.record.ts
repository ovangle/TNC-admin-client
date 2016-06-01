import {Record} from 'immutable';
import {date, num, str, recordCodec} from "caesium-model/json_codecs";

const _FILE_NOTE_RECORD = Record({by: null, at: new Date(), message: ''});

export class FileNote extends _FILE_NOTE_RECORD {
    /// The id of the user who added the file note
    by: number;
    at: Date;
    message: string;
}

export const fileNoteCodec = recordCodec<FileNote>(
    { by: num, at: date, message: str },
    (args) => new FileNote(args)
);

