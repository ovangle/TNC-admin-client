import {Pipe, PipeTransform} from '@angular/core';
import {enumToString} from 'caesium-model/json_codecs';

export const enum MemberTermType {
    Temporary,
    Associate,
    General
}

export const _MEMBER_TERM_TYPE_SERIALIZED_VALUES = Immutable.Map<string,MemberTermType>({
    'TEMPORARY': MemberTermType.Temporary,
    'ASSOCIATE': MemberTermType.Associate,
    'GENERAL': MemberTermType.General
});

export const memberTermTypeCodec = enumToString<MemberTermType>(
    _MEMBER_TERM_TYPE_SERIALIZED_VALUES.flip()
);

@Pipe({name: 'termType'})
export class MemberTermTypePipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        switch(value) {
            case MemberTermType.Temporary:
                return 'Temporary';
            case MemberTermType.Associate:
                return 'Associate';
            case MemberTermType.General:
                return 'General';
        }
    }
}
