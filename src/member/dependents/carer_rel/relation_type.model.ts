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
        'PARENT'
        | 'PARTNER_OF_PARENT'
        | 'SIBLING'
        | 'OTHER'

export const RELATION_TYPE_VALUES = OrderedMap<RelationType, string>([
    ['PARENT', 'Parent'],
    ['PARTNER_OF_PARENT', 'Partner of parent'],
    ['SIBLING', 'Sibling'],
    ['OTHER', 'Other']
]);

export const RELATION_TYPE_CODEC: Codec<RelationType, string> = identity;

