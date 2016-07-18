import {OrderedMap} from 'immutable'
import {str} from 'caesium-model/json_codecs'

// TODO: This (and some other enums) should be exported by the server
// and stored as database selectedValues. We can't be sure that we have the entire
// list of energy retailers.
// Will do for initial implementation
export type EnergyRetailer = 'NOT_DISCLOSED'
        | 'AGL'
        | 'CLICK_ENERGY'
        | 'DODO'
        | 'ENERGY_AUSTRALIA'
        | 'ORIGIN'
        | 'RED_ENERGY';

export const ENERGY_RETAILER_VALUES = OrderedMap<EnergyRetailer,string>([
    ['NOT_DISCLOSED', 'Not disclosed'],
    ['AGL', 'Agl'],
    ['CLICK_ENERGY', 'Click Energy'],
    ['ENERGY_AUSTRALIA', 'Energy Australia'],
    ['DODO', 'Dodo'],
    ['ORIGIN', 'Origin'],
    ['RED_ENERGY', 'Red Energy']
]);

export const ENERGY_RETAILER_CODEC = str;

