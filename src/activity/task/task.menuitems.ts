import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Dropdown} from '../../utils/layout/dropdown.component';

import {DropdownMenuItem} from '../../utils/layout/dropdown_menu.component';

export const TASK_MENU_ITEMS= List([
    {
        name: 'Issue voucher',
        children: List([
            {
                name: 'Foodcare',
                command: ['create', {task: 'ISSUE_VOUCHER', voucher: 'FOODCARE'}]
            },
            {
                name: 'Chemist',
                command: ['create', {task: 'ISSUE_VOUCHER', voucher: 'CHEMIST'}]
            },
            {
                name: 'EAPA',
                command: ['create', {task: 'ISSUE_VOUCHER', voucher: 'EAPA'}]
            }
        ])
    }
]);


