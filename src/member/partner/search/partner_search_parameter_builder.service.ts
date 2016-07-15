import {Map} from 'immutable';

import {Injectable} from '@angular/core';
import {ParameterBuilder} from '../../../utils/search';

@Injectable()
export class PartnerParameterBuilder extends ParameterBuilder {
    buildParamValues(fragments:Immutable.Set<string>):Immutable.Map<string, any> {
        var paramValues = Map<string,any>();

        var idFragment = fragments.find(fragment => /\d+/.test(fragment));
        if (idFragment) {
            paramValues = paramValues.set('id', idFragment);
        }

        var nameFragments = fragments
            .filter(fragment => /\D+/.test(fragment))
            .map((fragment) => fragment.toLowerCase())
            .toSet();
        return paramValues;
    }
}
