import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';

import {Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {AsyncPipe} from '@angular/common';

import {isBlank} from 'caesium-core/lang';

import {UserContext} from '../../admin/user/context.service';
import {Name, NamePipe} from '../../member/basic';

import {Dropdown} from './dropdown.component';

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
    
    .navbar-right {
        margin-top: 10px;
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
            <div *ngIf="isLoggedIn | async" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a [routerLink]="['/member']">Members</a></li>
                    <li><a [routerLink]="['/admin']">Admin</a></li> 
                    
                </ul>
                
                <div class="navbar-right">
                    <div class="user-menu" *ngIf="isLoggedIn | async">
                        <a [routerLink]="['/home']">{{userName | async | name}}</a>
                        <button class="btn btn-default btn-sm" (click)="logout()">
                            <i class="fa fa-sign-out"></i> 
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `,
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
        return this.userContext.staffMember
            .map(staffMember => isBlank(staffMember) ? null : staffMember.name);
    }

    ngOnInit() {
        this.userChange = this.userContext.user.subscribe((_) => {
            this.changeDetector.markForCheck();
        });
    }

    ngOnDestroy() {
        if (!this.userChange.closed) {
            this.userChange.unsubscribe();
        }
    }

    get isLoggedIn(): Observable<boolean> {
        return this.userContext.loggedIn;
    }

    _activateUserDropdown() {
        this._userDropdownActive = true;
    }

    logout() {
        this.userContext.logout();
    }
}
