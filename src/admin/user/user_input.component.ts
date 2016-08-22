import {List} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnChanges, SimpleChange, ChangeDetectorRef
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {UserGroup, UserGroupSelect} from '../user_group';

import {Name} from '../../member/basic';
import {AbstractUser, User} from './user.model';
import {UserManager} from './user.manager';



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
    directives: [UserGroupSelect],
    styleUrls: [
        '../../../assets/css/flex.css',
        '../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInput implements OnChanges {
    /**
     * The name is provided to suggest an appropriate username.
     */
    @Input() name: Name;

    @Input() user: AbstractUser;
    @Output() userChange = new EventEmitter<AbstractUser>();

    constructor(
        private userManager: UserManager,
        private changeDetector: ChangeDetectorRef
    ) { }

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
