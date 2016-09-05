import {List, Map} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {forwardRef, Injectable} from '@angular/core';

import {Type, isString} from 'caesium-core/lang';
import {union, itemList} from 'caesium-model/json_codecs';
import {ArgumentError} from 'caesium-model/exceptions';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {DATE} from '../../utils/string_encoders';

import {Member} from '../../member';

import {VoucherType} from './voucher_type.model';
import {Voucher} from './voucher.model';
import {ChemistVoucher} from './chemist';
import {EAPAVoucher} from './eapa';
import {FoodcareVoucher} from './foodcare';

const _VOUCHER_TYPES = Map<VoucherType,Type>({
    'FOODCARE': FoodcareVoucher,
    'CHEMIST': ChemistVoucher,
    'EAPA': EAPAVoucher
});

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

    getVouchersForMember(
        member: Member, params?: {
            type?: VoucherType,
            before?: Date,
            after?: Date
        }
    ): Observable<List<Voucher>> {
        var request = this._requestFactory.get('');
        request.setRequestParameters({
            member: member.id
        });

        if (params) {
            request.setRequestParameters({
                type: params.type,
                before: params.before ? DATE(params.before) : null,
                after: params.after ? DATE(params.after) : null,
            });
        }

        return request.send()
            .handle({select: 200, decoder: itemList(this.modelCodec)});
    }

    //noinspection JSAnnotator
    create<U extends Voucher>(type: VoucherType | Type, args: any): U {
        if (isString(type)) {
            let t = <VoucherType>type;
            if (!_VOUCHER_TYPES.has(t))
                throw new ArgumentError('Unsupported voucher type: ' + type);
            type = _VOUCHER_TYPES.get(t);
        }
        return <U>super.create(<Type>type, args);
    }

}

export const VOUCHER_CODEC = union(
    ChemistVoucher,
    FoodcareVoucher,
    EAPAVoucher
);
