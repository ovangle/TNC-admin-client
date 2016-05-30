import {Record} from 'immutable';
import {date, num, str, recordCodec} from "caesium-model/json_codecs";

export class FileNote
extends Record({by: null, at: new Date(), message: ''}) {
    /// The id of the user who added the file note
    by: number;
    at: Date;
    message: string;
}

export const fileNoteCodec = recordCodec<FileNote>(
    { by: num, at: date, message: str },
    (args) => new FileNote(args)
);

