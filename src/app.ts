import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {isBlank} from 'caesium-core/lang';

import {ModalDialogComponent, ModalDialogService} from './utils/modal_dialog';
import {NavBarComponent} from './layout/nav_bar.component'
import {UserManager} from './admin/user/user.manager';
import {UserContext} from './admin/user/context.service';

@Component({
    selector: 'main-app',
    template: `
        <header>
            <nav-bar></nav-bar>
        </header>
        <main class="flex">
            <router-outlet></router-outlet>
        </main>
        <modal-dialog></modal-dialog>
    `,
    styles: [`
    :host {
        height: 100%;
        display: block;
        flex-direction: column;
        overflow: hidden;
    }

    header {
        background-color: #fff;
    }
    
    p { margin: 0; padding: 0; }
    
    main {
        height: calc(100% - 80px);
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/flex.css'
    ],
    directives: [ROUTER_DIRECTIVES, NavBarComponent, ModalDialogComponent],
    providers: [UserManager, UserContext, ModalDialogService],
    encapsulation: ViewEncapsulation.Native
})
export class MainApp implements OnInit {
    constructor(
        private userContext: UserContext,
        private router: Router
    ) { }

    ngOnInit() {
        this.userContext.initialize().then((success) => {
            if (!success) {
                this.router.navigate(['/login']);
            }
        })
    }

}
