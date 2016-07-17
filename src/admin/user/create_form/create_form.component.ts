import {Set} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {identity} from 'caesium-core/codec';
import {JsonObject} from 'caesium-model/json_codecs';

import {DateInput} from '../../../utils/date/date_input.component';
import {ModalDialog} from '../../../utils/modal_dialog/modal_dialog.model';
import {ModalDialogService} from '../../../utils/modal_dialog/modal_dialog.service';
import {EnumSelect2} from '../../../utils/enum';

import {
    Name, NameInput,
} from '../../../member/basic';

import {AbstractUser, UserManager, UserInput} from '../../user';
import {StaffType} from '../../staff/type';

import {CreateUserRequest, CreateUserResponse, CREATE_USER_RESPONSE_CODEC} from './create_user.model';

@Component({
    selector: 'user-create-form',
    template: `
    <div class="page-header">
        <h1>New staff member</h1> 
        <div class="btn-group">
            <button class="btn btn-primary" (click)="save()">
                <i class="fa fa-save"></i>Save 
            </button>
                    
            <a class="btn btn-danger" [routerLink]="'/admin'">
                <i class="fa fa-close"></i>Close 
            </a>
        </div>
    </div>    
    <div class="page">
    <enum-select2 [label]="'Type'" 
                  [value]="user.staffType"
                  (valueChange)="_staffTypeChanged($event)"></enum-select2>

    <name-input [name]="user.staffName"
                (nameChange)="_nameChanged($event)"></name-input>
    
    <user-input 
        [name]="user.staffName"
        [user]="user"
        (userChange)="_userChanged($event)">
    </user-input>
    </div> 
    `,
    directives: [
        NameInput, DateInput, EnumSelect2, UserInput,
        ROUTER_DIRECTIVES
    ],
    styles: [`
    .page-header > h1 {
        display: inline-block;
    }    
    .btn-group {
        float: right;
        margin-top: 20px;
    }
    i.fa {
        margin-right: 0.5em;
    }    
    :host {
        display: block;
        height: 100%;
        overflow: auto;
        padding-left: 1rem;
        padding-right: 1rem;
    }    
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateForm {
    user: CreateUserRequest;
    errors: JsonObject;

    constructor(private userManager: UserManager,
                private changeDetector: ChangeDetectorRef,
                private modalDialog: ModalDialogService,
                private router: Router
    ) { }

    routerOnActivate() {
        this.user = new CreateUserRequest();
        this.changeDetector.markForCheck();
    }

    _nameChanged(name: Name) {
        this.user= <CreateUserRequest>this.user.set('staffName', name);
    }

    _staffTypeChanged(staffType: StaffType) {
        this.user = <CreateUserRequest>this.user.set('staffType', staffType);
    }

    _userChanged(user: AbstractUser) {
        this.user = <CreateUserRequest>user;
    }

    _createdDialog(createUserResponse: CreateUserResponse): ModalDialog {
        return {
            title: 'Created staff member',
            bodyHTML: `
            <p>Temporary password:</p> 
            <p><b>note:</b><em>The password is temporary and should be changed by the user on the first login.</em></p>
            <p><code>${createUserResponse.password}</code></p>
            `
        };

    }

    private save() {
        var response = this.userManager.post(this.user);
        response.handle({select: 400, decoder: identity}).forEach((errs) => {
            this.errors = errs;
        });
        response.handle({select: 201, decoder: CREATE_USER_RESPONSE_CODEC}).forEach((createUserResponse) => {
            this.modalDialog.activate(this._createdDialog(createUserResponse)).then((confirm) => {
                this.router.navigate(['/admin']);
            });
        });
    }
}
