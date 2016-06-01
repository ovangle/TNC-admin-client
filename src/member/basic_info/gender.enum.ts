import {Pipe, PipeTransform} from '@angular/core';
import {enumToString} from 'caesium-model/json_codecs';

export const enum Gender { Male, Female }

const _GENDER_SERIALIZED_VALUES = Immutable.Map<string,Gender>({
    'MALE': Gender.Male,
    'FEMALE': Gender.Female
});

export const GENDER_VALUES = _GENDER_SERIALIZED_VALUES.valueSeq().toList();

export const genderCodec = enumToString(_GENDER_SERIALIZED_VALUES.flip());

@Pipe({name: 'gender'})
export class GenderPipe implements PipeTransform {
    transform(value: any, args: any[]) {
        switch (value) {
            case Gender.Male: return 'Male';
            case Gender.Female: return 'Female';
            default:
                return value;
        }
    }
}
