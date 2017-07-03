import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {isBlank} from 'caesium-core/lang';
import {identityConverter} from 'caesium-core/converter';
import {Codec} from 'caesium-core/codec';

import {RequestFactory} from 'caesium-json/manager/request';

import {JsonObject, itemList} from 'caesium-json/json_codecs';

export class ResultPage<T> {
    private _rawResponse: Observable<any>;
    /// This should not be necessary, however the json codec mutates the
    /// raw response.
    private _itemList: List<T>;

    get isLastPage$(): Observable<boolean> {
        return this._rawResponse.map(response => response['last_page']);
    }

    get itemList$(): Observable<List<T>> {
        return this._rawResponse.map((response) => {
            if (!isBlank(this._itemList)) {
                return this._itemList;
            }

           return this._itemList = itemList(this.codec).decode(response);
        });
    }

    constructor(
        public requestFactory: RequestFactory,
        public endpoint: string,
        public params: any,
        public codec: Codec<T,JsonObject>,
        public pageId: number = 1
    ) {
        let request = this.requestFactory.get(this.endpoint);
        let requestParams = Object.assign({}, this.params, {page: this.pageId});
        request.setRequestParameters(requestParams);

        this._rawResponse = request.send()
            .handle({select: 200, decoder: identityConverter})
            .publishReplay(1).refCount();
    }

    next(): ResultPage<T> {
        return new ResultPage<T>(this.requestFactory, this.endpoint, this.params,
            this.codec, this.pageId + 1);
    }
}
