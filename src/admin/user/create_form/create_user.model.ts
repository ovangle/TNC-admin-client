
import {List, Record} from 'immutable';
import {str, list, model, recordCodec} from 'caesium-model/json_codecs';

import {Name, NAME_CODEC} from '../../../member/basic';
import {AbstractUser} from '../../user';


import {UserGroup} from '../../user_group';
import {StaffMember, StaffType, STAFF_TYPE_CODEC} from '../../staff';

const _CREATE_USER_REQUEST_RECORD = Record({
    username: '',
    groups: List<UserGroup>(),
    staffType: 'OFFICE_VOLUNTEER',
    staffName: new Name()
});

export class CreateUserRequest extends _CREATE_USER_REQUEST_RECORD implements AbstractUser {
    username: string;
    groups: List<UserGroup>;
    staffType: StaffType;
    staffName: Name;

    set(key: any, value: any): CreateUserRequest {
        return <CreateUserRequest>super.set(key, value);
    }
}

export const CREATE_USER_REQUEST_CODEC = recordCodec<CreateUserRequest>({
    username: str,
    groups: list(model(UserGroup)),
    staffType: STAFF_TYPE_CODEC,
    staffName: NAME_CODEC,
}, (args) => new CreateUserRequest(args));

const _CREATE_USER_RESPONSE = Record({
    username: null,
    password: null
});

export class CreateUserResponse extends _CREATE_USER_RESPONSE {
    username: string;
    password: string;
}

export const CREATE_USER_RESPONSE_CODEC = recordCodec<CreateUserResponse>({
    username: str,
    password: str
}, (args) => new CreateUserResponse(args));
