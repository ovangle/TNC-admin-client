import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {Task} from './task.model';
import {TaskType} from './task_type.model';
import {VoucherType} from '../voucher/voucher_type.model';
import {VoucherManager} from '../voucher/voucher.manager';

@Injectable()
export class TaskManager extends ManagerBase<Task> {
    getModelType(): Type { return Task; }
    getModelSubtypes(): Type[] { return []; }
    getSearchParameters(): SearchParameter[] {
        return [


        ];
    }

    constructor(options: ManagerOptions) {
        super(options);
    }

    save(task: Task): Observable<Task> {
        var request = this._requestFactory.post('', this.modelCodec);
        request.setRequestBody(task);
        return request.send()
            .handle({select: 201, decoder: this.modelCodec});

    }

 }
