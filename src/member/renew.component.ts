import {Component, Input} from "angular2/core";

import {Member} from './member.model';

@Component({
    selector: 'member-renewal-script',
    template: ``,
    styles: [`
    :host { display: block; height: 100%; width: 100%; }
    `]
})
export class MemberRenewalScript {
    @Input() member: Member;
    

}
