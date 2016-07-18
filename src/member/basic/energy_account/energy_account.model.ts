import {Record} from 'immutable';

import {str, recordCodec} from 'caesium-model/json_codecs';

import {EnergyRetailer, ENERGY_RETAILER_CODEC} from './energy_retailer.model';

const _ENERGY_ACCOUNT_RECORD = Record({
    retailer: 'NOT_DISCLOSED',
    accountNumber: ''
});

export class EnergyAccount extends _ENERGY_ACCOUNT_RECORD {
    retailer: EnergyRetailer;
    accountNumber: string;
}

export const ENERGY_ACCOUNT_CODEC = recordCodec<EnergyAccount>({
    retailer: ENERGY_RETAILER_CODEC,
    accountNumber: str,
}, (args) => new EnergyAccount(args));
