import {List, Map} from 'immutable';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

import {Injectable} from '@angular/core';

import {Type, isBlank} from 'caesium-core/lang';
import {union, itemList} from 'caesium-json/json_codecs';
import {ManagerBase, ManagerOptions} from 'caesium-json/manager';

import {DATE} from 'utils/string_encoders';

import {Member} from 'member';

import {VoucherType} from './voucher_type.model';
import {Voucher} from './voucher.model';
import {ChemistVoucher} from './chemist/chemist_voucher.model';
import {EAPAVoucher} from './eapa/eapa_voucher.model';
import {FoodcareVoucher} from './foodcare/foodcare_voucher.model';

const _VOUCHER_TYPES = Map<VoucherType,Type<any>>({
    'FOODCARE': FoodcareVoucher,
    'CHEMIST': ChemistVoucher,
    'EAPA': EAPAVoucher
});

@Injectable()
export class VoucherManager extends ManagerBase<Voucher> {
    constructor(options: ManagerOptions) {
        super(Voucher, options);
    }

    getModelSubtypes(): Type<any>[] {
        return [ChemistVoucher, EAPAVoucher, FoodcareVoucher];
    }

    private static _getVouchersCache = Map<string, List<Voucher>>();
    private static _getVouchersParamsHash(member: Member, params?: {type?: VoucherType, before?: Date, after?: Date}) {
        let type = (params && params.type) ? params.type : '';
        let before = (params && params.before) ? DATE(params.before) : '';
        let after = (params && params.after) ? DATE(params.after) : '';

        return `${member.id}-${type}-${before}-${after}`;
    }

    getVouchersForMember(
        member: Member,
        params?: {
            type?: VoucherType,
            before?: Date,
            after?: Date
        }
    ): Observable<List<Voucher>> {
        if (isBlank(member)) {
            return Observable.of(List<Voucher>());
        }

        let hash = VoucherManager._getVouchersParamsHash(member, params);
        if (VoucherManager._getVouchersCache.has(hash)) {
            return Observable.of(VoucherManager._getVouchersCache.get(hash));
        }

        let requestParams = {member: isBlank(member) ? '' : member.id};

        if (params) {
            requestParams = Object.assign({}, requestParams, {
                type: params.type,
                before: params.before ? DATE(params.before) : null,
                after: params.after ? DATE(params.after) : null,
            });
        }
        var request = this._requestFactory.get('voucher');
        request.setRequestParameters(requestParams);

        return request.send()
            .handle({select: 200, decoder: itemList(this.modelCodec)})
            .do((vouchers: List<Voucher>) => {
                VoucherManager._getVouchersCache = VoucherManager._getVouchersCache.set(hash, vouchers);
            })
    }

    save<U extends Voucher>(member: Member, voucher: U): Observable<U> {
        let voucherType = voucher.getType();
        let path = `${member.id}/activity/voucher/${voucherType.toLowerCase()}`;
        let request = this._requestFactory.post(path, VOUCHER_CODEC);
        request.setRequestBody(voucher);
        return request.send()
            .handle<U>({select: 200, decoder: VOUCHER_CODEC});
    }
}

export const VOUCHER_CODEC = union(
    ChemistVoucher,
    FoodcareVoucher,
    EAPAVoucher
);
