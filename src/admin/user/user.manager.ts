import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Response as HttpResponse} from '@angular/http';
import {Type, isBlank} from 'caesium-core/lang';
import {Response} from 'caesium-model/manager/request/interfaces';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {identity, model} from 'caesium-model/json_codecs';

import {Name} from '../../member/basic';

import {CreateUserRequest, CREATE_USER_REQUEST_CODEC} from './create_form/create_user.model';
import {User, LoginDetails} from './user.model';

@Injectable()
export class UserManager extends ManagerBase<User> {
    constructor(options:ManagerOptions) {
        super(options);
    }

    getModelType() {
        return User;
    }

    getModelSubtypes():Type[] {
        return [];
    }

    getSearchParameters():SearchParameter[] {
        return undefined;
    }

    initialize(): Observable<User> {
        var request = this._requestFactory.get('initialize');
        var response = request.send();

        return response
            .handle<User>({select: 200, decoder: this.modelCodec})
            .catch<User>((err: HttpResponse) => {
                if (err.status === 401 /* unauthorized */) {
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

    suggestUniqueUsername(name:Name):Observable<string> {
        var request = this._requestFactory.get('suggest_username');
        request.setRequestParameters({
            firstName: name.firstName,
            lastName: name.lastName
        });
        var response = request.send();
        return response.handle<string>({select: 200, decoder: (body) => body['username']});
    }

    post(user: CreateUserRequest): Response {
        var request = this._requestFactory.post('', CREATE_USER_REQUEST_CODEC);
        request.setRequestBody(user);
        return request.send();
    }
}
