import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/from';
import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';
import {Dependent} from './dependent.model';

@Injectable()
export class DependentManager extends ManagerBase<Dependent> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType() { return Dependent; }
    getModelSubtypes(): Type[] { return []; }
    getSearchParameters(): SearchParameter[] { return undefined; }
}
