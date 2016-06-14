import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'admin-home',
    template: `
        <router-outlet></router-outlet>
    `,
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHome {

}
