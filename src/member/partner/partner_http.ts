// TODO: Remove this and any references to it.
/**
 * Just mock out server requests until
 * we get the server up and running
 */
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {Injectable, Inject} from "@angular/core";
import {Http, Response} from "@angular/http";

import {JsonObject} from 'caesium-model/json_codecs';
import {ModelHttp, RawResponse, RequestOptions, API_HOST_HREF} from "caesium-model/manager/model_http";

@Injectable()
export class PartnerHttp extends ModelHttp {
    constructor(http: Http, @Inject(API_HOST_HREF) hostHref: string) {
        super(http, hostHref);
    }

    request(options: RequestOptions): Observable<RawResponse> {
        return this.http.get('/partners.json').map((response: Response) => {
            var members = response.json()['items'];

            var idMatch = options.endpoint.toString().match(/\d+/);
            if (idMatch) {
                return getMemberById(members, Number.parseInt(idMatch[0]));
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

