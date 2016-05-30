import {
    Component, ChangeDetectionStrategy, ViewEncapsulation, provide, AfterViewChecked,
    ViewChild
} from 'angular2/core';
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {ModelHttp} from "caesium-model/manager";

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
    directives: [ROUTER_DIRECTIVES, MemberSearchComponent],
    providers: [
        HTTP_PROVIDERS,
        provide(ModelHttp, {useClass: MemberHttp})
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
    {path: '/', component: MemberSearchComponent, name: 'Search', useAsDefault: true},
    {path: '/:id', component: MemberDetailsComponent, name: 'MemberDetail'},
])
export class MemberHome implements AfterViewChecked {
    @ViewChild(MemberSearchComponent) searchComponent: MemberSearchComponent;
    @ViewChild(MemberDetailsComponent) detailsComponent: MemberDetailsComponent;

    ngAfterViewChecked() {
        if (this.searchComponent) {
            this.searchComponent.resultDisplay = 'TABLE';
        }
    }
}

