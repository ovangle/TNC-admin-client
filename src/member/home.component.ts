import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, provide, AfterViewInit,
    ViewChild
} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_DIRECTIVES, RouteConfig, Router, RouterOutlet} from 'angular2/router';
import {ModelHttp, ManagerOptions} from "caesium-model/manager";

import {MemberManager} from './member.model';
import {MemberSearchComponent} from "./search/search.component";
import {MemberHttp} from "./member_http";
import {MemberDetailsComponent} from "./details.component";

@Component({
    selector: 'member-home',
    template: `
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        //TODO: Remove. Should only need to provide MemberManager
        provide(ModelHttp, {useClass: MemberHttp}),
        ManagerOptions,
        MemberManager
    ],
    styles: [`
    :host { 
        position: absolute;
        top: 0; bottom: 0;
        right: 0; left: 0;
    }
    
    .container {
        height: 100%;
    } 
    
    member-search {
        height: 100%;
    }
    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RouteConfig([
    {path: '/search', component: MemberSearchComponent, name: 'Search', useAsDefault: true},
    {path: '/:id', component: MemberDetailsComponent, name: 'MemberDetail'},
])
export class MemberHome {
    ngOnInit() {
        console.log('MemberHome.onInit()');
    }
}

