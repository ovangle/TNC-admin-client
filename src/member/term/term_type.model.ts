import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type MemberTermType = 'TEMPORARY'
        | 'ASSOCIATE'
        | 'GENERAL'
        | 'PARTNER';

export const MEMBER_TERM_TYPE_VALUES = OrderedMap<MemberTermType, string>([
    ['TEMPORARY', 'Temporary'],
    ['ASSOCIATE', 'Associate'],
    ['GENERAL', 'General'],
    ['PARTNER', 'Partner']
]);

export const MEMBER_TERM_TYPE_SELECT_VALUES: OrderedMap<MemberTermType,string> =
        MEMBER_TERM_TYPE_VALUES
            .filter((value, key) => key !== 'PARTNER')
            .toOrderedMap();

export const MEMBER_TERM_TYPE_CODEC: Codec<MemberTermType,string> = identity;

