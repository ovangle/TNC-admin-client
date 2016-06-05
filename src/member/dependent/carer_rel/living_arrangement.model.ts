import {OrderedMap} from 'immutable';
import {enumToString} from 'caesium-model/json_codecs';

export const enum LivingArrangement {
    NotDisclosed,
    /**
     * The dependent permanently resides with the carer.
     */
    FullTime,

    /**
     * The dependent sometimes lives with the carer
     * at least one day per week
     */
    PartTime,

    /**
     * The dependent lives with the carer sporadically
     */
    Occasional,

    /**
     * The dependent never lives with the carer
     */
    Never
}

const _LIVING_ARRANGEMENT_SERIALIZED_VALUES = OrderedMap<LivingArrangement,string>([
    [LivingArrangement.NotDisclosed, 'NOT_DISCLOSED'],
    [LivingArrangement.FullTime, 'FULL_TIME'],
    [LivingArrangement.PartTime, 'PART_TIME'],
    [LivingArrangement.Occasional, 'OCCASIONAL'],
    [LivingArrangement.Never], 'NEVER'
]);

export const LIVING_ARRANGEMENT_VALUES = _LIVING_ARRANGEMENT_SERIALIZED_VALUES.keySeq().toList();

export const LIVING_ARRANGEMENT_CODEC = enumToString<LivingArrangement>(_LIVING_ARRANGEMENT_SERIALIZED_VALUES);
