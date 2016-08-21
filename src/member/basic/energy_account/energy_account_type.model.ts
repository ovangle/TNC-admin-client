import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type EnergyAccountType = 'ELECTRICITY' | 'GAS';

export const ENERGY_ACCOUNT_TYPE_VALUES = OrderedMap<EnergyAccountType, string>([
    ['ELECTRICITY', 'Electricity'],
    ['GAS', 'Gas'],
]);

export const ENERGY_ACCOUNT_TYPE_CODEC: Codec<EnergyAccountType,string> = identity;
