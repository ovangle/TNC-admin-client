import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';
import {Dropdown} from './dropdown.component';

@Component({
    selector: 'dropdown-menu-item',
    template: `
    <ng-content></ng-content> 
    `,
    host: {
        '(click)': 'close.emit(null)'
    },
    styles: [`
    :host {display: block;}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuItem {
    @Input() link: any;
    @Output() close = new EventEmitter<any>();
}

@Component({
    selector: 'dropdown-menu',
    template: `
    <style>
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
    </style>
    
    <div class="dropdown" [ngClass]="{'open': _open}">
        <ul class="dropdown-menu">
            <ng-content select="dropdown-menu-item"></ng-content>
        </ul>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenu {
    @Input('open') _open: boolean;
    @Output('openChange') openChange = new EventEmitter<boolean>();

    constructor(
        private _cd: ChangeDetectorRef
    ) {}

    open() {
        this._open = true;
        this.openChange.emit(this._open);
        this._cd.markForCheck();
    }

    close() {
        this._open = false;
        this.openChange.emit(this._open);
        this._cd.markForCheck();
    }

    toggle() {
        this._open = !this._open;
        this.openChange.emit(this._open);
        this._cd.markForCheck();
    }
}

