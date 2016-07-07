import {OrderedMap} from 'immutable';

import {Pipe, PipeTransform} from '@angular/core';
import {enumToString} from 'caesium-model/json_codecs';

export const enum MemberTermType {
    Temporary,
    Associate,
    General
}

const _MEMBER_TERM_TYPE_SERIALIZED_VALUES = OrderedMap<MemberTermType, string>([
    [MemberTermType.Temporary, 'TEMPORARY'],
    [MemberTermType.Associate, 'ASSOCIATE'],
    [MemberTermType.General, 'GENERAL']
]);

export const MEMBER_TERM_TYPE_CODEC = enumToString<MemberTermType>(_MEMBER_TERM_TYPE_SERIALIZED_VALUES);
export const MEMBER_TERM_TYPE_VALUES = _MEMBER_TERM_TYPE_SERIALIZED_VALUES.keySeq().toList();


