import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

import {Modal} from './utils/modal';
import {UserContext} from './admin/user/context.service';

import {member} from 'member/member.model';
import {MemberSignupSuccess} from './member/signup/signup_success_alert.component';

@Component({
    selector: 'main-app',
    template: `
    <style>
    :host {
        height: 100%;
        display: block;
        flex-direction: column;
        overflow: hidden;
    } 
    header {
        background-color: #fff;
    }
        
    main {
        height: calc(100% - 80px); 
    }
    </style>
    
    <header>
        <nav-bar></nav-bar>
    </header>
    <main class="flex">
        <router-outlet></router-outlet>
    </main>
    <modal-dialog class="modalopen"></modal-dialog>
    
    `,
    providers: [
        UserContext
    ],
})
export class MainApp implements OnInit {
    constructor(
        private userContext: UserContext,
        private router: Router,
        private modal: Modal
    ) { }

    ngOnInit() {
        this.userContext.initialize();
    }

}

