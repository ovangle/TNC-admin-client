import {Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";

import {ContactInfo} from './contact_info.record';
import {EmailPipe} from './email.pipe';
import {PhonePipe} from './phone_number.pipe';

@Component({
    selector: 'contact-info',
    template: `
        <h3>Contact Info</h3>
        <form>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control"
                   [ngModel]="contactInfo.email" 
                   (ngModelChange)="_emailChange($event)"
                   [disabled]="disabled">
        </div>
        
        <div class="form-group">
            <label for="phone">Phone</label> 
            <input type="text" name="phone" class="form-control"
                   [ngModel]="contactInfo.phone" 
                   (ngModelChange)="_phoneChange($event)"
                   [disabled]="disabled">
        </div>
        
        <div class="form-group">
            <label for="mobile">Mobile</label> 
            <input type="text" name="mobile" class="form-control"
                   [ngModel]="contactInfo.mobile"
                   (ngModelChange)="_mobileChange($event)"
                   [disabled]="disabled">
        </div>
        </form>
        
        <!--
        <span *ngIf="contactInfo.email" [innerHtml]="contactInfo.email | email | valueOr: 'Unknown'"></span><br/>
        <label>Phone</label>{{ contactInfo.phone | phone: 'landline' | valueOr: 'Unknown'}}<br/>
        <label>Mobile</label>{{ contactInfo.mobile | phone: 'mobile' | valueOr: 'Unknown' }}<br/>
        -->
    `,
    styles: [`
    label { width: 10rem;
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    pipes: [EmailPipe, PhonePipe],
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

