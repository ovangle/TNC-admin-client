import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {SEARCH_NAME} from '../../member/basic/name/name.search_param.metadata';

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

    post(staff: StaffMember) {
        var request = this._requestFactory.post('', this.modelCodec);
        request.setRequestBody(staff);
        return request.send();
    }

    getById(id: any) {
        return super.getById(id + '/');
    }

}

const _STAFF_MEMBER_SEARCH_PARAMS: SearchParameter[] = [
    SEARCH_NAME
];

