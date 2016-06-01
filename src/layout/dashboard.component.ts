
import {Component, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";
import {ROUTER_DIRECTIVES, RouterLink, RouteConfig, RouterOutlet, Router} from 'angular2/router';

import {AdminHome} from '../admin/home.component';

import {MemberDetailsComponent} from '../member/details.component';
import {MemberHome} from '../member/home.component';
import {MemberRenewalScript} from "../member/renew.component";


@Component({
    selector: 'dashboard',
    template: `
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed">
                        <i class="fa fa-bars"></i>
                    </button>
                    <a class="navbar-brand" [routerLink]="['Dashboard', 'Member']">Home</a>
                </div> 
                
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a [routerLink]="['Dashboard', 'Member']">Members</a></li>
                        <li><a [routerLink]="['Dashboard', 'Admin']">Admin</a></li>
                    </ul> 
                </div>
            </div>     
        </nav>
    </header>
    <main class="flex">
        <router-outlet></router-outlet>   
    </main>
    `,
    styles: [`
    :host { 
        height: 100%; 
        display: flex; 
        flex-direction: column;
    }
    
    header {
        background-color: #fff;
    }
    
    button.navbar-toggle {
        padding: 6px 10px;
    }
    router-outlet {
        display: block;
        height: 100%;
    } 
    
    main {
        position: relative;
        overflow: hidden;
    }
    
    a { cursor: pointer; }
    `],
    styleUrls:[
        'assets/css/flex.css',
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css'
    ],
    directives: [RouterLink, ROUTER_DIRECTIVES, RouterOutlet],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RouteConfig([
    {path: '/member/...', component: MemberHome, as: 'Member'},
    {path: '/admin', component: AdminHome, as: 'Admin'}
])
export class DashboardComponent {
    /*
    constructor(router: Router) {
        router.navigate(['Member', 'Search']);
    }
    */

}
