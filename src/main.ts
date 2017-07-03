
import {enableProdMode} from '@angular/core';
import {RequestOptions as BaseRequestOptions, Headers} from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    LocationStrategy, HashLocationStrategy, PathLocationStrategy, APP_BASE_HREF
} from '@angular/common';


import {API_HOST_HREF, SEARCH_PAGE_SIZE} from 'caesium-json/manager';

import {loadAppConfig} from './config';
import {AppModule} from './app.module';

class RequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers = new Headers();
        this.headers.set('X-Requested-With', 'XMLHttpRequest');
        //TODO (caesium-json): This should be set on a per request basis.
        this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }
}

loadAppConfig().then(appConfig => {

    console.log('loading app config', appConfig);
    if (!appConfig.debug) {
        enableProdMode();
    }

    platformBrowserDynamic([
        {provide: BaseRequestOptions, useClass: RequestOptions},
        {provide: APP_BASE_HREF, useValue: appConfig.router.appBaseHref},
        {provide: API_HOST_HREF, useValue: appConfig.api.serverHref},
        {provide: SEARCH_PAGE_SIZE, useValue: appConfig.api.searchPageSize},
    ])
        .bootstrapModule(AppModule)
});
