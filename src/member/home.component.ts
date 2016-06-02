import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, provide, AfterViewInit,
    ViewChild
} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';
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
        display: block;
        height: 100%;
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
@Routes([
    {path: '/', component: MemberSearchComponent},
    {path: '/:id', component: MemberDetailsComponent},
])
export class MemberHome {
    ngOnInit() {
        console.log('MemberHome.onInit()');
    }
}

