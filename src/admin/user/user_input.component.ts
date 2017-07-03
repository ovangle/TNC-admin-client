import {List} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
    OnChanges, SimpleChange
} from '@angular/core';

import {UserGroup} from '../user_group';

import {Name} from 'member/basic/name';
import {AbstractUser, User} from './user.model';

@Component({
    selector: 'user-input',
    template: `
    <fieldset>
        <legend>User</legend>
        <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control"
                    [ngModel]="user.username"
                    (ngModelChange)="_usernameChanged($event)">
        </div>
        
        <user-group-select 
                     [selectedGroups]="user.groups"
                     (selectedGroupsChange)="_userGroupsChanged($event)">
        </user-group-select>
    </fieldset>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInput implements OnChanges {
    /**
     * The name is provided to suggest an appropriate username.
     */
    @Input() name: Name;

    @Input() user: AbstractUser;
    @Output() userChange = new EventEmitter<AbstractUser>();

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['name']) {
            var name = changes['name'].currentValue.toLowerCase();
            this._usernameChanged(`${name.firstName}.${name.lastName}`);
        }
    }

    private _usernameChanged(username: string) {
        this.userChange.emit(
            <User>this.user.set('username', username)
        );
    }

    private _userGroupsChanged(groups: List<UserGroup>) {
        this.userChange.emit(
            <User>this.user.set('groups', groups)
        );
    }
}
