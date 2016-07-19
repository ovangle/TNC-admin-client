import {Set, Map} from 'immutable';
import {Injectable} from '@angular/core';

import {ParameterBuilder} from '../../../utils/search/parameter_builder.service';

@Injectable()
export class StaffSearchParameterBuilder extends ParameterBuilder {
    buildParamValues(fragments: Set<string>):Map<string, any> {
        var paramValues = Map<string,any>();

        var idFragment = fragments.find((fragment) => !!fragment.match(/\d+/));
        if (idFragment) {
            paramValues = paramValues.set('id', Number.parseInt(idFragment));
        }

        var nameFragments = fragments
            .filter((fragment) => !!fragment.match(/\D+/))
            .map((fragment) => fragment.toLowerCase())
            .toSet();
        paramValues = paramValues.set('name', nameFragments);

        return paramValues;
    }
}
