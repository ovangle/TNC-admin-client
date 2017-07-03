import {Record} from 'immutable';

import {num, recordCodec} from 'caesium-json/json_codecs';

import {EnergyAccount, ENERGY_ACCOUNT_CODEC} from '../../../../member/basic';

export {EnergyAccount, EnergyAccountType, ENERGY_ACCOUNT_TYPE_VALUES} from '../../../../member/basic';

const _BILL_RECORD = Record({
    account: new EnergyAccount(),
    value: 0,
});

export class EnergyAccountBill extends _BILL_RECORD {
    account: EnergyAccount;
    value: number;

    constructor(args?: {
        account?: EnergyAccount,
        value?: number,
    }) {
        super(args);
    }

    get isValid(): boolean {
        return this.account.isValid
            && this.value >= 0;

    }
}

export const ENERGY_ACCOUNT_BILL_CODEC = recordCodec<EnergyAccountBill>(
    {
        account: ENERGY_ACCOUNT_CODEC,
        value: num
    },
    (args: any) => new EnergyAccountBill(args)
);



