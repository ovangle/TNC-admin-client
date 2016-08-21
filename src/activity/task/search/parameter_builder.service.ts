import {Set, Map} from 'immutable';

import {ParameterBuilder} from '../../../utils/search';

export class TaskParameterBuilder extends ParameterBuilder {
    buildParamValues(searchFragments:Immutable.Set<string>):Immutable.Map<string, any> {
        return undefined;
    }
}
