///<reference path="../typings/es6-shim/es6-shim.d.ts"/>
///<reference path="../node_modules/immutable/dist/immutable.d.ts"/>

import 'reflect-metadata';

import {provide} from 'angular2/core';
import {RequestOptions as BaseRequestOptions, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF
} from 'angular2/router';

import {bootstrap} from 'angular2/bootstrap';

import {API_HOST_HREF} from 'caesium-model/manager';

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
    ]);
});
