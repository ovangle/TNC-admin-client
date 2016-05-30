// TODO: Remove this and any references to it.
/**
 * Just mock out server requests until
 * we get the server up and running
 */
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {Injectable, Inject} from "angular2/core";
import {Http, Response} from "angular2/http";

import {JsonObject} from 'caesium-model/json_codecs';
import {ModelHttp, RawResponse, RequestOptions, API_HOST_HREF} from "caesium-model/manager/model_http";

@Injectable()
export class MemberHttp extends ModelHttp {
    constructor(http: Http, @Inject(API_HOST_HREF) hostHref: string) {
        super(http, hostHref);
    }

    request(options: RequestOptions): Observable<RawResponse> {
        return this.http.get('/members.json').map((response: Response) => {
            var members = response.json()['items'];

            var idMatch = options.endpoint.match(/\d+/);
            if (idMatch) {
                return getMemberById(members, Number.parseInt(idMatch[0]));
            }

            if (options.endpoint === 'search') {
                return searchMembers(members, options.params);
            }

            return {
                status: 500,
                body: {
                    reason: `Invalid request endpoint: ${options.endpoint}`
                }
            };
        });
    }
}

function getMemberById(members: Array<JsonObject>, id: number): RawResponse {
    for (let member of members) {
        if (member['id'] === id) {
            return {status: 200, body: member};
        }
    }
    return {status: 404, body: {reason: `Member ${id} not found`}}
}

const PAGE_SIZE = 20;

function searchMembers(members: Array<JsonObject>, params: {[param: string]: string}) {
    console.log('params', params);

    function matchPartialId(member: JsonObject, partialId: string): boolean {
        return member['id'].toString().startsWith(partialId);
    }

    function matchNameComponent(member: JsonObject, partialName: string) {
        return member['first_name'].includes(partialName)
            || member['last_name'].includes(partialName);
    }

    function matchName(member: JsonObject, partialName: string) {
        var components = partialName.split(',').map((component) => component.toLowerCase());
        return components.some((comp) => matchNameComponent(member, comp));
    }

    var matches = <JsonObject[]>[];

    var matchers = <Function[]>[];
    if (params['id']) {
        matchers.push((member: JsonObject) => matchPartialId(member, params['id']));
    }

    if (params['name']) {
        matchers.push((member: JsonObject) => matchName(member, params['name']));
    }

    for (let member of members) {
        for (let matcher of matchers) {
            if (matcher(member)) {
                matches.push(member);
            }
        }
    }

    var pageId = Number.parseInt(params['p']);
    return {
        status: 200,
        body: {
            pageId: pageId,
            items: matches.slice((pageId -1) * PAGE_SIZE, pageId * PAGE_SIZE),
            lastPage: pageId * PAGE_SIZE >= matches.length
        }
    };
}
