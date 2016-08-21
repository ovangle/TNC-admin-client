import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    forwardRef
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {isDefined} from 'caesium-core/lang';
import {Dropdown} from './dropdown.component';

/**
 * An item in a dropdown menu.
 *
 *
 */
export interface DropdownMenuItem {

    name: string;

    /// The router command, if this menu item is a link
    command?: any;

    /// The children of the item, if the menu item indicates a submenu
    children?: List<DropdownMenuItem>;
}

@Component({
    selector: 'dropdown-menu-item',
    template: `
    <div *ngIf="isSeparator" class="dropdown-separator"></div>    
    <div *ngIf="isSubmenu" class="dropdown-toggle" 
            class="submenu" 
            (mouseover)="_submenuActionMouseOver = true"
            (mouseout)="_submenuActionMouseOut()">
        <a class="menu-item" tabindex="0">{{item.name}}</a>
        <span class="submenu-caret"><i class="fa fa-caret-right"></i></span>
        <dropdown-menu 
        
            [items]="item.children" 
            [alignRight]="true"
            [active]="_submenuExpanded"
            (mouseover)="_submenuMouseOver = true"
            (mouseout)="_submenuMouseOver = false">
        </dropdown-menu>
    </div>
    <div *ngIf="isLink" class="dropdown-toggle">
        <a class="menu-item" tabindex="0" [routerLink]="item.command">{{item.name}}</a>
    </div>
    `,
    directives:[
        ROUTER_DIRECTIVES,
        forwardRef(() => DropdownMenu)
    ],
    styles: [`
    .submenu-caret {
        float: right;
        margin-right: 10px;
    }
    a.menu-item, .submenu-caret {
        font-weight: 400;
        line-height: 1.42857143;
        color: #333;
        cursor: pointer;
        padding: 3px;
    }
    a.menu-item {
        display: inline-block;
        outline: none;
    }    
    a.menu-item:hover, a.menu-item:focus {
        color: #333;
        text-decoration: none;
        outline: none;
    }    
    
    .submenu {
        position: relative;
    }
    dropdown-menu {
        top: 0;
        left: 100%;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class DropdownMenuItemComponent {
    @Input() item: DropdownMenuItem;
    @Output() close = new EventEmitter<any>();

    private _submenuActionMouseOver = false;
    private _submenuMouseOver = false;

    get _submenuExpanded(): boolean {
        return this._submenuMouseOver || this._submenuActionMouseOver;

    }

    get isLink() {
        return isDefined(this.item.command);
    }

    get isSubmenu() {
        return isDefined(this.item.children);
    }

    get isSeparator() {
        return !(this.isLink || this.isSubmenu);
    }

    _submenuActionMouseOut() {
        setTimeout(() => {
            this._submenuActionMouseOver = false;
        }, 0);
    }
}

@Component({
    selector: 'dropdown-menu',
    template: `
    <dropdown [active]="active">
        <ul class="list-unstyled">
            <li *ngFor="let item of items.toArray()">
                <dropdown-menu-item [item]="item" (close)="menuItemClose($event)"></dropdown-menu-item> 
            </li>
        </ul>
    </dropdown>
    `,
    directives: [Dropdown, DropdownMenuItemComponent],
    styles: [`
    ul.list-unstyled {
    }    
    dropdown-menu-item {
        display: block;
        padding: 3px 20px;
        clear: both;
        white-space: nowrap;
    }    
    dropdown-menu-item:hover {
        background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff5f5f5', endColorstr='#ffe8e8e8', GradientType=0);
        background-repeat: repeat-x;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenu {
    @Input() items: List<DropdownMenuItem>;
    @Input() active: boolean;
    @Output() close = new EventEmitter<any>();

    menuItemClose(isLink: boolean) {
    }
}

