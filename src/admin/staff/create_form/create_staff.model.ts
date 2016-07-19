
import {List, Record} from 'immutable';
import {str, list, model, recordCodec} from 'caesium-model/json_codecs';

import {Name, NAME_CODEC} from '../../../member/basic';
import {AbstractUser} from '../../user';


import {UserGroup} from '../../user_group';
import {StaffMember, StaffType, STAFF_TYPE_CODEC} from '../../staff';

const _CREATE_STAFF_REQUEST_RECORD = Record({
    username: '',
    groups: List<UserGroup>(),
    staffType: 'OFFICE_VOLUNTEER',
    staffName: new Name()
});

export class CreateStaffRequest extends _CREATE_STAFF_REQUEST_RECORD implements AbstractUser {
    username: string;
    groups: List<UserGroup>;
    staffType: StaffType;
    staffName: Name;

    set(key: any, value: any): CreateStaffRequest {
        return <CreateStaffRequest>super.set(key, value);
    }
}

export const CREATE_STAFF_REQUEST_CODEC= recordCodec<CreateStaffRequest>({
    username: str,
    groups: list(model(UserGroup)),
    staffType: STAFF_TYPE_CODEC,
    staffName: NAME_CODEC,
}, (args) => new CreateStaffRequest(args));

const _CREATE_STAFF_RESPONSE = Record({
    username: null,
    password: null
});

export class CreateStaffResponse extends _CREATE_STAFF_RESPONSE {
    username: string;
    password: string;
}

export const CREATE_STAFF_RESPONSE_CODEC = recordCodec<CreateStaffResponse>({
    username: str,
    password: str
}, (args) => new CreateStaffResponse(args));

export interface CreateStaffErrors {
    username?: {
        required?: boolean,
        duplicate?: boolean
    };
    groups?: {
        notfound: boolean
    };
    staffName?: {
        firstName?: {required?: boolean}
        lastName?: {required?: boolean}
    }
}
