import 'rxjs/add/observable/from';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';
import {Type} from 'caesium-core/lang';
import {Response} from 'caesium-json/manager/request/interfaces';
import {ManagerBase, ManagerOptions} from 'caesium-json/manager';

import {identity} from 'caesium-json/json_codecs';

import {Name} from 'member/basic/name';

import {User, LoginDetails} from './user.model';

@Injectable()
export class UserManager extends ManagerBase<User> {
    constructor(options:ManagerOptions) {
        super(User, options);
    }

    getModelSubtypes():Type<any>[] {
        return [];
    }

    initialize(): Observable<User> {
        var request = this._requestFactory.get('initialize');
        var response = request.send();

        return response
            .handle({select: 200, decoder: this.modelCodec})
            .catch((err: HttpResponse) => {
                if (err.status === 403 /* unauthorized */) {
                    return Observable.of(null);
                }
                return Observable.throw(err);
            });
    }

    login(loginDetails:LoginDetails):Response {
        var request = this._requestFactory.put('login', identity);
        request.setRequestBody(loginDetails);
        return request.send();
    }

    logout(): Response {
        var request = this._requestFactory.put('logout', identity);
        request.setRequestBody({});
        return request.send();
    }

    suggestUniqueUsername(name:Name):Observable<string> {
        var request = this._requestFactory.get('suggest_username');
        request.setRequestParameters({
            firstName: name.firstName,
            lastName: name.lastName
        });
        var response = request.send();
        return response.handle<string>({select: 200, decoder: (body: any) => body['username']});
    }
}
