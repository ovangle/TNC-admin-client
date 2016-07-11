import {Set} from 'immutable';

import {SearchParameter} from 'caesium-model/manager';

import {Name} from './name.model';

/**
 * Matches the model name against a set of fragments, each of which
 * may match against either the first name, last name or alias of the name.
 *
 * @param modelValue
 * @param nameFragments
 * @returns {boolean}
 */
function nameMatcher(modelValue: Name, nameFragments: Set<string>): boolean {
    var lowercaseName = modelValue.toLowerCase();


    return nameFragments.every((fragment) =>
        lowercaseName.firstName.includes(fragment)
        || lowercaseName.lastName.includes(fragment)
        || lowercaseName.alias.includes(fragment)
    );
}

function nameRefiner(previousNameFragments: Set<string>, currentNameFragments: Set<string>) {
    return currentNameFragments.every(fragment => {
        return previousNameFragments.contains(fragment)
            || previousNameFragments.some((prevFragment) => prevFragment.includes(fragment));
    })

}

export const NAME_SEARCH: SearchParameter = {
    name: 'name',
    encoder: (fragments: Set<string>) => fragments.join(','),
    accessor: (value: {name: Name}) => value.name,
    matcher: nameMatcher,
    refiner: nameRefiner
};
