import {Type} from 'caesium-core/lang';
import {ManagerBase, SearchParameter} from 'caesium-model/manager';
import {Dependent} from './dependent.model';

export class DependentManager extends ManagerBase<Dependent> {
    getModelType() { return Dependent; }
    getModelSubtypes(): Type[] { return []; }
    getSearchParameters(): SearchParameter[] { return undefined; }
}
