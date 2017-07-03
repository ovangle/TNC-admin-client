import {List} from 'immutable';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/scan';

import {Codec} from 'caesium-core/codec';
import {JsonObject} from 'caesium-json/json_codecs';
import {RequestFactory} from 'caesium-json/manager/request';

import {ResultPage} from './result_page';

export class Search2<T> {
    constructor(
        public requestFactory: RequestFactory,
        public endpoint: string,
        public params: any,
        public codec: Codec<T,JsonObject>,
    ) { }

    private _resultPages = new Subject<ResultPage<T>>();

    /**
     * A stream of the result pages that are retrieved from the server
     * @type Observable<ResultPage<T>>
     */
    public resultPage$ = this._resultPages.publishReplay(1).refCount();

    public itemList$ = this.resultPage$
        .concatMap(page => page.itemList$)
        .distinctUntilChanged()
        .scan(
            (currentItemList, pageItemList) => {
                return currentItemList.concat(pageItemList).toList()
            },
            List<T>()
        );


    /**
     * A stream which emits the complete Array of items each time a
     * new page is received
     *
     * The stream is publishReplay(1)
     * @type Observable<Array<T>>
     */
    public items$ = this.itemList$.map(itemList => itemList.toArray());

    send() {
        let resultPage = new ResultPage<T>(this.requestFactory, this.endpoint, this.params, this.codec);
        this._resultPages.next(resultPage);
    }

    /**
     * close the search
     */
    complete() {
        this._resultPages.complete();
    }

    /**
     * Loads the next page. Returns `true` if the last page has been loaded,
     * `false` otherwise.
     * @returns {Observable<boolean>}
     */
    loadNextPage(): Observable<boolean> {
        return this.resultPage$.first()
            .switchMap(resultPage =>
                resultPage.isLastPage$.do(isLastPage => {
                    if (isLastPage) {
                        this._resultPages.complete();
                    } else {
                        this._resultPages.next(resultPage.next())
                    }
                })
            );
    }

}
