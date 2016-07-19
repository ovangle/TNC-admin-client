import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';

import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {NAME_SEARCH} from '../../member/basic/name/name.search_param.metadata';

import {
    CreateStaffRequest, CREATE_STAFF_REQUEST_CODEC,
    CreateStaffResponse, CREATE_STAFF_RESPONSE_CODEC,
    CreateStaffErrors
} from './create_form/create_staff.model';
import {StaffMember} from './staff.model';


@Injectable()
export class StaffManager extends ManagerBase<StaffMember> {

    constructor(options: ManagerOptions) {
        super(options);
    }


    getModelType():Type { return StaffMember; }
    getModelSubtypes():Type[] { return []; }

    getSearchParameters():SearchParameter[] {
        return _STAFF_MEMBER_SEARCH_PARAMS;
    }

    post(createRequest: CreateStaffRequest): Observable<CreateStaffResponse | CreateStaffErrors>  {
        var request = this._requestFactory.post('', CREATE_STAFF_REQUEST_CODEC);
        request.setRequestBody(createRequest);
        return request.send()
            .handle({select: 201, decoder: this.modelCodec})
            .catch((response: HttpResponse) => {
                if (response.status === 400) {
                    return Observable.of(response.json());
                }
                return Observable.throw(response);
            });
    }

    getById(id: any) {
        return super.getById(id + '/');
    }

}

const _STAFF_MEMBER_SEARCH_PARAMS: SearchParameter[] = [
    NAME_SEARCH
];

