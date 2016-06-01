import {Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";

import {ContactInfo} from './contact_info.record';
import {EmailPipe} from './email.pipe';
import {PhonePipe} from './phone_number.pipe';

import {PhoneInput} from '../../utils/components/phone_input.component';

@Component({
    selector: 'contact-info',
    template: `
        <form>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control"
                   [ngModel]="contactInfo.email" 
                   (ngModelChange)="_emailChange($event)"
                   [disabled]="disabled">
        </div>
        
        <phone-input [label]="'Phone'"
                     [format]="'(dd) dddd dddd'"
                     [phoneNumber]="contactInfo.phone"
                     (phoneNumberChange)="_phoneChange($event)"
                     [disabled]="disabled"></phone-input>
        <phone-input [label]="'Mobile'"
                     [format]="'dddd dddd dddd'"
                     [phoneNumber]="contactInfo.phone"
                     (phoneNumberChange)="_mobileChange($event)"
                     [disabled]="disabled">
        </phone-input>
        </form>
    `,
    directives: [PhoneInput],
    styles: [`
    label { width: 10rem;
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoComponent {
    @Input() contactInfo:ContactInfo;
    @Input() disabled: boolean = false;
    @Output() contactInfoChange = new EventEmitter<ContactInfo>();

    _emailChange(value: string) {
        this.contactInfoChange.emit(
            <ContactInfo>this.contactInfo.set('email', value)
        );
    }

    _phoneChange(value: string) {
        this.contactInfoChange.emit(
            <ContactInfo>this.contactInfo.set('phone', value)
        );
    }

    _mobileChange(value: string) {
        this.contactInfoChange.emit(
            <ContactInfo>this.contactInfo.set('mobile', value)
        );
    }
}

