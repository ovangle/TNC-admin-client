import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';
import {Observable} from 'rxjs/Observable';
import {OrderedMap} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnInit
} from '@angular/core';
import {FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES, Validators} from '@angular/forms';

import {User} from '../user.model';
import {UserContext} from '../context.service';
import {InputErrorBlock, STANDARD_INPUT_ERRORS} from '../../../utils/components/input_error_block.component';


@Component({
    selector: 'user-login-form',
    directives: [REACTIVE_FORM_DIRECTIVES, InputErrorBlock],
    styleUrls: [
        '../../../../assets/css/bootstrap.css',
        './login_form.component.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginForm implements OnInit {
    private usernameErrorMessages = OrderedMap([
        ...STANDARD_INPUT_ERRORS,
        ['notfound', 'No such user']
    ]);
    private passwordErrorMessages = OrderedMap([
        ...STANDARD_INPUT_ERRORS,
        ['incorrect', 'Incorrect password']
    ]);

    loginDetails: FormGroup;

    private username: FormControl;
    private password: FormControl;

    private usernameExists: Observable<{notfound: boolean}>;

    constructor(private userContext: UserContext) {}

    ngOnInit() {
        this.username = new FormControl('', [Validators.required], [(_) => this.usernameExists.first()]);
        this.usernameExists = this.username.valueChanges
            .debounceTime(300)
            .concatMap(value => this.checkUsernameExists(value));
        this.password = new FormControl('', [Validators.required]);
        this.loginDetails = new FormGroup({
            'username': this.username,
            'password': this.password
        });
    }

    private checkUsernameExists(username: string): Observable<{notfound: boolean}> {
        return this.userContext.loginUser({username: username, password: ''})
            .map(value => (value instanceof User) ? null : value.username);
    }

    login() {
        this.userContext.loginUser(this.loginDetails.value).forEach((value) => {
            if (value instanceof User) {
                this.username.setErrors(null);
                this.password.setErrors(null);
            } else {
                this.username.setErrors(value.username);
                this.password.setErrors((value as any).password);
            }
        });
    }
}

