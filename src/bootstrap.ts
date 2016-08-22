///<reference path="../typings/es6-shim/es6-shim.d.ts"/>
///<reference path="../typings/node/node.d.ts"/>
///<reference path="../node_modules/immutable/dist/immutable.d.ts"/>

import {enableProdMode} from '@angular/core';
import {RequestOptions as BaseRequestOptions, Headers, HTTP_PROVIDERS} from '@angular/http';
import {bootstrap as ngBootstrap} from '@angular/platform-browser-dynamic';
import {
    LocationStrategy, HashLocationStrategy, PathLocationStrategy, APP_BASE_HREF
} from '@angular/common';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {APP_ROUTER_PROVIDERS} from './app.routes';

import {API_HOST_HREF, SEARCH_PAGE_SIZE, MANAGER_PROVIDERS} from 'caesium-model/manager';

import {COMPONENT_HOST_PROVIDERS} from './utils/component_host';
import {MODAL_PROVIDERS} from './utils/modal';

import {loadAppConfig} from './config';
import {MainApp} from './app';

class RequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers = new Headers();
        this.headers.set('X-Requested-With', 'XMLHttpRequest');
        //TODO (caesium-model): This should be set on a per request basis.
        this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }
}

export function bootstrap(): Promise<any> {
    return loadAppConfig().then((appConfig) => {
        console.log('loading app config', appConfig);
        if (!appConfig.debug) {
            enableProdMode();
        }

        var apiHost = appConfig.api.serverHref;

        var locationStrategyCls = (appConfig.router.locationStrategy === "hash")
            ? HashLocationStrategy
            : PathLocationStrategy;
        ngBootstrap(MainApp, [
            HTTP_PROVIDERS,
            {provide: BaseRequestOptions, useClass: RequestOptions},
            APP_ROUTER_PROVIDERS,
            {provide: LocationStrategy, useClass: locationStrategyCls},
            {provide: APP_BASE_HREF, useValue: appConfig.router.appBaseHref},
            {provide: API_HOST_HREF, useValue: appConfig.api.serverHref},
            {provide: SEARCH_PAGE_SIZE, useValue: appConfig.api.searchPageSize},
            MANAGER_PROVIDERS,
            COMPONENT_HOST_PROVIDERS,
            MODAL_PROVIDERS,
            disableDeprecatedForms(),
            provideForms()
        ]);
    });
}
