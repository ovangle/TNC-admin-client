///<reference path="../typings/es6-shim/es6-shim.d.ts"/>
///<reference path="../node_modules/immutable/dist/immutable.d.ts"/>

import 'reflect-metadata';

import {provide} from '@angular/core';
import {RequestOptions as BaseRequestOptions, Headers, HTTP_PROVIDERS} from '@angular/http';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {
    LocationStrategy, HashLocationStrategy, PathLocationStrategy, APP_BASE_HREF
} from '@angular/common';

import { ROUTER_PROVIDERS } from '@angular/router-deprecated';


import {API_HOST_HREF, SEARCH_PAGE_SIZE, MANAGER_PROVIDERS} from 'caesium-model/manager';

import {loadAppConfig} from './config';
import {MainApp} from './app';

//FIXME: Publish changes to caesium-model and replace this with MODEL_HTTP_PROVIDERS
const MODEL_HTTP_PROVIDERS = [
    HTTP_PROVIDERS,
    provide(API_HOST_HREF, {useValue: 'http://127.0.0.1:8000'})
];


class RequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers = new Headers();
        this.headers.set('X-Requested-With', 'XMLHttpRequest');
    }
}

loadAppConfig().then((appConfig) => {

    var locationStrategyCls = (appConfig.router.locationStrategy === "hash")
        ? HashLocationStrategy
        : PathLocationStrategy;
    bootstrap(MainApp, [
        HTTP_PROVIDERS,
        provide(BaseRequestOptions, {useClass: RequestOptions}),
        ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: locationStrategyCls}),
        provide(APP_BASE_HREF, {useValue: appConfig.router.appBaseHref}),
        provide(API_HOST_HREF, {useValue: appConfig.api.serverHref}),
        provide(SEARCH_PAGE_SIZE, {useValue: appConfig.api.searchPageSize}),
        MANAGER_PROVIDERS
    ]);
});
