import {List} from 'immutable';

import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

interface MenuOption {
    routerLink: any[];
    name: string;
}

abstract class MenuOptionsService {
    constructor() {}

    abstract navbarOptions(): List<MenuOption>;
}

@Component({
    selector: 'nav-bar',
    template: `
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" [routerLink]="['/']">Home</a>
            </div>

            <!-- TODO: Child routers need to register their menu items separately */
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li *ngFor="let menuItem of menuOptions.navbarOptions()">
                        <a [routerLink]="menuItem.link">{{menuItem.name}}</a>
                    </li>
                </ul>
            </div>
            -->
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                   <li><a [routerLink]="['/member']">Members</a></li>
                   <li><a [routerLink]="['/admin']">Admin</a></li> 
                </ul>
            </div>
        </div>
    </nav>
    `,
    directives: [ROUTER_DIRECTIVES],
    styles: [`
    :host {
        display: block;
    }    
    
    nav {
        display: inline-block;
    }    
    
    button.navbar-toggle {
        padding: 6px 10px;
    }

    a {
        cursor: pointer;
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {
    //menuOptions: MenuOptionsService;

    constructor(/* menuOptions: MenuOptionsService */) {
        //this.menuOptions = menuOptions;
    }
}
