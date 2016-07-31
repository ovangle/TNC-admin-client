import {Record} from 'immutable';

import {str, recordCodec} from 'caesium-model/json_codecs';

import {EnergyRetailer, ENERGY_RETAILER_CODEC} from './energy_retailer.model';
import {EnergyAccountType, ENERGY_ACCOUNT_TYPE_CODEC} from './energy_account_type.model';

const _ENERGY_ACCOUNT_RECORD = Record({
    type: 'ELECTRICITY',
    retailer: 'NOT_DISCLOSED',
    accountNumber: ''
});

export class EnergyAccount extends _ENERGY_ACCOUNT_RECORD {
    type: EnergyAccountType;
    retailer: EnergyRetailer;
    accountNumber: string;

    constructor(args?: {type: EnergyAccountType, retailer: EnergyRetailer, accountNumber: string}) {
        super(args);
    }
}

export const ENERGY_ACCOUNT_CODEC = recordCodec<EnergyAccount>({
    type: ENERGY_ACCOUNT_TYPE_CODEC,
    retailer: ENERGY_RETAILER_CODEC,
    accountNumber: str,
}, (args: any) => new EnergyAccount(args));
