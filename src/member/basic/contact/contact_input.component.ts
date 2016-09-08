import {Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';

import {isDefined} from 'caesium-core/lang';

import {Contact} from './contact.model';
import {PhoneInput} from '../../../utils/components/phone_input.component';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Component({
    selector: 'contact-input',
    template: `
    <style>
    phone-input {
        margin-left: 30px; 
    } 
    </style>

    <div class="layout horizontal">
        <div class="form-group email-input flex"
            [ngClass]="{
                'has-error': emailControl.touched && !emailControl.valid
            }">
            <label class="control-label" for="email">Email</label>
            <input type="email" id="email" class="form-control"
                   [ngModel]="contact.email" 
                   (ngModelChange)="propChanged('email', $event)"
                   [disabled]="disabled"
                   #emailControl="ngModel"
                   pattern="${EMAIL_REGEXP.source}">
            <span class="help-block" *ngIf="emailControl.touched && emailControl.errors?.pattern">
                Email is not valid 
            </span>      
        </div>

        <phone-input class="flex"
                [label]="'Phone'"
                [format]="'(dd) dddd dddd'"
                [phoneNumber]="contact.phone"
                (phoneNumberChange)="propChanged('phone', $event)"
                (validityChange)="propValidityChanged('phone', $event)"
                [disabled]="disabled">
        </phone-input>

        <phone-input class="flex"
                [label]="'Mobile'"
                [format]="'dddd ddd ddd'"
                [phoneNumber]="contact.mobile"
                (phoneNumberChange)="propChanged('mobile', $event)"
                (validityChange)="propValidityChanged('mobile', $event)"
                [disabled]="disabled">
        </phone-input>
    </div>
    `,
    directives: [PhoneInput],
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('css/flex.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInput {
    @Input() contact: Contact;
    @Output() contactChange = new EventEmitter<Contact>();
    @Output() validityChange = new EventEmitter<boolean>();

    @Input() label: string;
    @Input() disabled: boolean;

    @ViewChild('emailControl') emailControl: FormControl;

    private _validity = Set<string>(['email', 'phone', 'mobile']);

    private propChanged(prop: string, value: string) {
        if (isDefined(this.emailControl) && prop === 'email') {
            this.propValidityChanged('email', this.emailControl.valid);
        }
        this.contactChange.emit(
            <Contact>this.contact.set(prop, value)
        );
    }

    private propValidityChanged(prop: string, value: boolean) {
        if (value) {
            this._validity = this._validity.remove(prop);
        } else {
            this._validity = this._validity.add(prop);
        }
        this.validityChange.emit(this._validity.isEmpty());
    }
}
