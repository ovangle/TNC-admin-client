import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';

import {Injectable} from '@angular/core';
import {Type} from 'caesium-core/lang';
import {union, itemList, model} from 'caesium-model/json_codecs';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {Member} from '../member.model';
import {NonMemberPartner} from '../partner';
import {Dependent} from '../dependent/dependent.model';
import {Carer} from './carer.model';

@Injectable()
export class CarerManager extends ManagerBase<Carer> {
    getModelType() { return Carer; }
    getModelSubtypes(): Type[] { return []; }

    getSearchParameters():SearchParameter[] { return undefined; }

    constructor(options: ManagerOptions) {
        super(options);
    }

    carerSource(carer: Carer): Observable<Member|NonMemberPartner> {
        var request = this._requestFactory.get(`${carer.id}/source`);
        return request.send()
            .handle({select: 200, decoder: union(Member, NonMemberPartner)});
    }

    getDependents(carer: Carer): Observable<List<Dependent>> {
        var request = this._requestFactory.get(`${carer.id}/dependents`);
        return request.send()
            .handle({select: 200, decoder: itemList(model<Dependent>(Dependent))});
    }
}
