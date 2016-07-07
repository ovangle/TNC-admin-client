import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {itemList} from 'caesium-model/json_codecs';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {Member} from '../member.model';

import {Voucher} from './voucher.model';
import {ChemistVoucher} from './chemist';
import {EAPAVoucher} from './eapa';
import {FoodcareVoucher} from './foodcare';

@Injectable()
export class VoucherManager extends ManagerBase<Voucher> {
    constructor(options: ManagerOptions) {
        super(options);
    }

    getModelType(): Type { return Voucher; }
    getModelSubtypes(): Type[] {
        return [ChemistVoucher, EAPAVoucher, FoodcareVoucher];
    }
    getSearchParameters(): SearchParameter[] {
        return undefined;
    }
    
    getVouchersForMember(member: Member): Observable<List<Voucher>> {
        var request = this._requestFactory.get('');
        request.setRequestParameters({
            member: member.id
        });
        return request.send()
            .handle({select: 200, decoder: itemList(this.modelCodec)});
    }
}
