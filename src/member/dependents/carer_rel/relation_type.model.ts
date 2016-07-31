import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

/**
 * The relation type.
 *
 * Controls whether the partner of the parent has the dependent added to
 * their 'Carer'.
 *
 * PARENT
 *        - Dependent is added to the member's dependents,
 *        - Display option to determine whether partner is also parent
 *
 * PARTNER_OF_PARENT
 *        - Dependent is added to the partner's dependents (if a partner exists)
 *          not added to the member's dependents.
 *
 * SIBLING/OTHER
 *        - Only added to the member's dependents.
 */
export type RelationType =
        'NOT_DISCLOSED'
        | 'PARENT'
        | 'PARTNER_OF_PARENT'
        | 'SIBLING'
        | 'OTHER'
        | 'NO_RELATION'

export const RELATION_TYPE_VALUES = OrderedMap<RelationType, string>([
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['PARENT', 'Parent'],
    ['PARTNER_OF_PARENT', 'Partner of parent'],
    ['SIBLING', 'Sibling'],
    ['OTHER', 'Other'],
    ['NO_RELATION', 'No relation']
]);

export const REVERSE_RELATION_TYPE_VALUES = OrderedMap<RelationType, string>([
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['PARENT', 'Child'],
    ['PARTNER_OF_PARENT', 'Child of partner'],
    ['SIBLING', 'Sibling'],
    ['OTHER', 'Other'],
    ['NO_RELATION', 'No relation']
]);

export const RELATION_TYPE_CODEC: Codec<RelationType, string> = identity;

