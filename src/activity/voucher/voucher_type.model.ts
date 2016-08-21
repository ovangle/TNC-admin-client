import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type VoucherType = 'CHEMIST' | 'FOODCARE' | 'EAPA';

export const VOUCHER_TYPE_VALUES = OrderedMap<VoucherType,string>([
    ['CHEMIST', 'Chemist'],
    ['FOODCARE', 'Foodcare'],
    ['EAPA', 'EAPA']
]);

export const VOUCHER_TYPE_CODEC: Codec<VoucherType,string> = identity;

