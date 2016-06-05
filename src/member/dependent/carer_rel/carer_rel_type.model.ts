import {OrderedMap} from 'immutable';
import {enumToString} from 'caesium-model/json_codecs';

export const enum CarerRelType {
    NotDisclosed,
        
    /**
     * The dependent is a parent of the child
     */
    Parent,

    /**
     * The dependent is a child of the carer's partner
     */
    PartnerOfParent,

    /**
     * The dependent is a sibling of the carer
     */
    Sibling,

    /**
     * The dependent is a grandparent, uncle, aunty or other relation
     * to the dependent
     */
    OtherRelation,

    /**
     * The carer is not related by blood to the dependent.
     */
    NoFamilialRelation
}

const _CARER_REL_TYPE_SERIALIZED_VALUES= OrderedMap<CarerRelType,string>([
    [CarerRelType.NotDisclosed, 'NOT_DISCLOSED'],
    [CarerRelType.Parent, 'PARENT'],
    [CarerRelType.PartnerOfParent, 'PARTNER_OF_PARENT'],
    [CarerRelType.Sibling, 'SIBLING'],
    [CarerRelType.OtherRelation, 'OTHER_RELATION'],
    [CarerRelType.NoFamilialRelation, 'NO_FAMILIAL_RELATION']
]);

export const CARER_REL_TYPE_VALUES = _CARER_REL_TYPE_SERIALIZED_VALUES.keySeq().toList();

export const CARER_REL_TYPE_CODEC = enumToString<CarerRelType>(_CARER_REL_TYPE_SERIALIZED_VALUES);
