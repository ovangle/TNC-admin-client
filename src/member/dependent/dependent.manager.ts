import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';
import {Injectable} from '@angular/core';


import {Type} from 'caesium-core/lang';
import {itemList} from 'caesium-model/json_codecs';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';
import {Carer} from '../carer';
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
