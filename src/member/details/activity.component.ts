import {
    Component
} from '@angular/core';

import {MemberContext} from '../member_context.service';

@Component({
    selector: 'member-activity',
    template: `
    <style>
    :host { 
        display: block; 
        height: 100%;
    }  
    </style>
    <router-outlet></router-outlet>
    `,
})
export class MemberActivity {
    constructor(private memberContext: MemberContext) { }
}
