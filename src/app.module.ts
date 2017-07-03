import {NgModule} from '@angular/core';
import {HttpModule, BaseRequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';

import {ManagerModule} from 'caesium-json/manager';

import {BrowserModule} from '@angular/platform-browser';

import {LayoutModule} from 'utils/layout';
import {ModalModule} from 'utils/modal';
import {NameModule} from 'member/basic/name';
import {NavBarComponent} from './nav_bar.component';

import {AdminModule} from './admin/admin.module';
import {MemberModule} from './member/member.module';
import {ActivityModule} from './activity/activity.module';

import {APP_ROUTES} from './app.routes';
import {MainApp} from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES, {useHash: true}),
        HttpModule,

        ManagerModule,

        LayoutModule,
        ModalModule,
        NameModule,

        AdminModule,
        MemberModule,
        ActivityModule
    ],
    providers: [],
    declarations: [
        NavBarComponent,
        MainApp
    ],
    bootstrap: [
        MainApp
    ]
})
export class AppModule {
}

