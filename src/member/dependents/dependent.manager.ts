import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/from';

import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-json/manager';
import {Dependent} from './dependent.model';

export interface DependentErrors {

}

@Injectable()
export class DependentManager extends ManagerBase<Dependent> {
    constructor(options: ManagerOptions) {
        super(Dependent, options);
    }

    getModelSubtypes(): Type<any>[] { return []; }

    save(dependent: Dependent): Observable<Dependent | DependentErrors> {
        var request: any;
        if (dependent.id === null) {
            request = this._requestFactory.post('', this.modelCodec);
        } else {
            request = this._requestFactory.put(`${dependent.id}`, this.modelCodec);
        }
        request.setRequestBody(dependent);
        var response = request.send();
        return response.handle({select: [200,201], codec: this.modelCodec})

    }
}
