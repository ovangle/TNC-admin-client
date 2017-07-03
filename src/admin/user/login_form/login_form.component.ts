import 'rxjs/add/operator/first';
import 'rxjs/add/operator/publishReplay';

import {
    Component, ChangeDetectionStrategy
} from '@angular/core';
import {
    AbstractControl, FormControl, FormGroup, Validators
} from '@angular/forms';
import {UserContext} from '../context.service';

@Component({
    selector: 'user-login-form',
    styleUrls: [
        './login_form.component.css'
    ],
    templateUrl: './login_form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginForm {

    loginDetails: FormGroup;

    constructor(private userContext: UserContext) {}

    ngOnInit() {
        this.loginDetails = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
        this.loginDetails.setValidators((control: AbstractControl) => {
            let value = control.value;
            let errors: any = null;
            if (value.username === '') {
                errors = Object.assign({}, errors, {usernameRequired: true});
            }
            if (value.password === '') {
                errors = Object.assign({}, errors, {passwordRequired: true});
            }
            return errors;
        });
        this.loginDetails.valueChanges.forEach(changes => {
            console.log('login errors', this.loginDetails.errors, 'pending', this.loginDetails.pending);
        })
    }

    login() {
        this.userContext.loginUser(this.loginDetails.value)
    }
}

