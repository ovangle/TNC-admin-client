import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {PhoneNumberPipe} from '../../../utils/pipes/phone_number.pipe';
import {Contact} from './contact.model';

@Component({
    selector: 'contact-display',
    template: `
    <div class="row">
        <h3>Contact</h3>
        <ul class="list-unstyled">
            <li class="clearfix">
                <span class="display-label col-sm-3">Email</span> 
                <span class="display-value col-sm-9"><a [href]="contact?.emailHref">{{contact.email}}</a></span>
            </li>
            <li>
                <span class="display-label col-sm-3">Phone</span>
                <span class="display-value col-sm-9">{{contact?.phone | phone: '(dd) dddd dddd'}}</span>
            </li>
            <li>
                <span class="display-label col-sm-3">Mobile</span> 
                <span class="display-value col-sm-9">{{contact?.mobile | phone: 'dddd ddd ddd'}}</span>
            </li> 
        </ul>
    </div>   
    `,
    pipes: [PhoneNumberPipe],
    styles: [`
    .display-label {
        font-weight: bold;
        text-align: right;
    }
    `],
    styleUrls: [
       'assets/css/bootstrap.css',
        'assets/css/details_display.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDisplay {
    @Input() contact: Contact;
}

