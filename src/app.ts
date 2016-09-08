import {Component, ViewEncapsulation, OnInit, Input} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {ModalDialog} from './utils/modal';
import {NavBarComponent} from './utils/layout/nav_bar.component'
import {UserManager} from './admin/user/user.manager';
import {UserContext} from './admin/user/context.service';

import {bootstrap} from './bootstrap';

// CSS which needs to be included in index.html
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'css/flex.css';

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
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('css/flex.css')
    ],
    directives: [ROUTER_DIRECTIVES, NavBarComponent, ModalDialog],
    providers: [UserManager, UserContext],
    encapsulation: ViewEncapsulation.Native
})
export class MainApp implements OnInit {
    constructor(
        private userContext: UserContext,
        private router: Router
    ) { }

    ngOnInit() {
        this.userContext.initialize();
    }

}

bootstrap(MainApp);
