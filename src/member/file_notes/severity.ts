import {OrderedMap} from 'immutable';
import {str} from 'caesium-json/json_codecs';

export type FileNoteSeverity = 'INFO' | 'WARNING' | 'DANGER';

export const FILE_NOTE_SEVERITY_VALUES = OrderedMap<string,string>([
    ['INFO', 'Info'],
    ['WARNING', 'Warning'],
    ['DANGER', 'Danger']
]);

export const FILE_NOTE_SEVERITY_CODEC = str;
