import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';

import {Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {isBlank} from 'caesium-core/lang';

import {UserContext} from '../../admin/user/context.service';
import {Name, NamePipe} from '../../member/basic';

import {Dropdown} from './dropdown.component';


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
    <style>
    :host {
        display: block;
    }    
    
    nav.navbar-default {
        margin-bottom: 0;
        width: 100%;
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
    </style>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle"
                        (click)="expand">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" [routerLink]="['/']">Home</a>
            </div>

            <!-- TODO: Child routers need to register their menu items separately */ -->
            <div *ngIf="isLoggedIn" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a [routerLink]="['/member']">Members</a></li>
                    <li><a [routerLink]="['/admin']">Admin</a></li> 
                    
                </ul>
                
                <p class="navbar-text navbar-right">
                    <a [routerLink]="['/home']">{{userName | async | name}}</a>
                </p>
            </div>
        </div>
    </nav>
    `,
    directives: [ROUTER_DIRECTIVES, Dropdown],
    pipes: [NamePipe, AsyncPipe],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {

    private userChange: Subscription;
    private _userDropdownActive: boolean = false;

    constructor(
        private userContext: UserContext,
        private changeDetector: ChangeDetectorRef) {
    }

    get userName(): Observable<Name> {
        if (isBlank(this.userContext.user)) {
            return null;
        }
        return this.userContext.user
            .map(user => user.staffMember.name);
    }

    ngOnInit() {
        this.userChange = this.userContext.user.subscribe((_) => {
            this.changeDetector.markForCheck();
        });
    }

    ngOnDestroy() {
        if (!this.userChange.isUnsubscribed) {
            this.userChange.unsubscribe();
        }
    }

    get isLoggedIn(): boolean {
        return this.userContext.loggedIn;
    }

    _activateUserDropdown() {
        this._userDropdownActive = true;
    }
}
