import {
    Component, Input, ChangeDetectionStrategy
} from '@angular/core';

import {Contact} from './contact.model';

@Component({
    selector: 'contact-display',
    template: `
    <h3>Contact</h3>
    <ul class="list-unstyled">
        <li class="clearfix">
            <span class="display-label col-sm-3">Email</span> 
            <span class="display-value col-sm-9" [ngSwitch]="contact.email !== ''">
                <div *ngSwitchCase="true"><a [href]="contact.emailHref">{{contact.email}}</a></div>
                <div *ngSwitchDefault>Not disclosed</div>
            </span>
        </li>
        <li class="clearfix">
            <span class="display-label col-sm-3">Phone</span>
            <span class="display-value col-sm-9">{{contact.phone | phone: '(dd) dddd dddd' | orElse: 'Not disclosed'}}</span>
        </li>
        <li class="clearfix">
            <span class="display-label col-sm-3">Mobile</span> 
            <span class="display-value col-sm-9">{{contact.mobile | phone: 'dddd ddd ddd' | orElse: 'Not disclosed'}}</span>
        </li> 
    </ul>
    `,
    styles: [`
    :host { display: block; }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDisplay {
    @Input() contact: Contact;
}

