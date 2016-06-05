import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Contact} from './contact.model';
import {PhoneInput} from '../../../utils/components/phone_input.component';

@Component({
    selector: 'contact-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control"
                   [ngModel]="contact.email" 
                   (ngModelChange)="_emailChanged($event)"
                   [disabled]="disabled">
        </div>
            
        <phone-input [label]="'Phone'"
            [format]="'(dd) dddd dddd'"
            [phoneNumber]="contact.phone"
            (phoneNumberChange)="_phoneChanged($event)"
            [disabled]="disabled"></phone-input>
        <phone-input [label]="'Mobile'"
            [format]="'dddd dddd dddd'"
            [phoneNumber]="contact.mobile"
            (phoneNumberChange)="_mobileChanged($event)"
            [disabled]="disabled">
        </phone-input>
    </fieldset>
    `,
    directives: [PhoneInput],
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'   
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInput {
    @Input() contact: Contact;
    @Output() contactChange = new EventEmitter<Contact>();
    
    @Input() label: string;
    @Input() disabled: boolean;

    _emailChanged(email: string) {
        this.contactChange.emit(
            <Contact>this.contact.set('email', email)
        );
    }

    _phoneChanged(phoneNumber: string) {
        this.contactChange.emit(
            <Contact>this.contact.set('phone', phoneNumber)
        );
    }

    _mobileChanged(mobileNumber: string) {
        this.contactChange.emit(
            <Contact>this.contact.set('mobile', mobileNumber)
        );
    }

}
