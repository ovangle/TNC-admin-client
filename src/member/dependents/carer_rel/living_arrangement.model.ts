import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type LivingArrangement = 'NOT_DISCLOSED'
        | 'NEVER'
        | 'OCCASIONAL'
        | 'PART_TIME'
        | 'FULL_TIME';

export const LIVING_ARRANGEMENT_VALUES = OrderedMap<LivingArrangement, string>([
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['NEVER', 'Never'],
    ['OCCASIONAL', 'Occasional/sporadic'],
    ['PART_TIME', 'Part time'],
    ['FULL_TIME', 'Full time']
]);

export const LIVING_ARRANGEMENT_CODEC: Codec<LivingArrangement,string> = identity;

