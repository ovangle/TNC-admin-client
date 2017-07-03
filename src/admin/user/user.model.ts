import {List} from 'immutable';

import {forwardRef} from '@angular/core';

import {Model, Property, RefProperty, ModelBase} from 'caesium-json/model';
import {bool, str, list, model} from "caesium-json/json_codecs";

import {UserGroup} from '../user_group';
import {StaffMember} from '../staff/staff.model';

export interface AbstractUser {
    username: string;
    groups: List<UserGroup>;

    set(propName: string, value: any): AbstractUser;
}

@Model({kind: 'user::User'})
export class User extends ModelBase implements AbstractUser {
    @Property({codec: str})
    username: string;

    /// There is only ever one admin user, so this will usually be false.
    /// It is not possible to set the admin user from within the application.
    @Property({codec: bool, readOnly: true})
    isAdmin: boolean;

    @Property({codec: list(model(forwardRef(() => UserGroup))), defaultValue: List})
    groups: List<UserGroup>;

    /*
    @Property({codec: PERMISSION_MAP_CODEC, defaultValue: Map})
    extraPermissions: PermissionMap;
    */

    @RefProperty({refName: 'staffMember', refType: forwardRef(() => StaffMember)})
    staffMemberId: number;
    staffMember: StaffMember;

    /*
    get permissions(): PermissionMap {
        return this._getPermissions();
    }

    @memoize()
    _getPermissions(): PermissionMap {
        var groupPermissions = this.groups.map((group) => group.permissions).toArray();
        return mergePermissionMaps(this.extraPermissions, ...groupPermissions);
    }

    checkPermission(key: string, action: string) {
        return this.permissions.get(key, Set<string>()).contains(action);
    }
    */

    set(propName: string, value: any) {
        return super.set(propName, value);
    }
}

export interface LoginDetails {
    username: string;
    password: string;
}
