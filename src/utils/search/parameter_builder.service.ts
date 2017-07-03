import {Map, Set} from 'immutable';
import {SearchParameter} from 'caesium-json/manager';

export abstract class ParameterBuilder {
    /**
     * Build a map of parameter names to the selectedValues, given
     * the new value of the search.
     *
     * @param searchFragments
     * The raw search string, split on each whitespace element and with
     * any duplicate elements removed.
     */
    abstract buildParamValues(searchFragments: Set<string>): Map<string,any>;
}

