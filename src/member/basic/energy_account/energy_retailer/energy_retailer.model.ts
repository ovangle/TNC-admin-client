import {OrderedMap} from 'immutable'
import {enumToString} from 'caesium-model/json_codecs'

// TODO: This (and some other enums) should be exported by the server
// and stored as database values. We can't be sure that we have the entire
// list of energy retailers.
// Will do for initial implementation


export const enum EnergyRetailer {
    NotDisclosed,
    Agl,
    ClickEnergy,
    Dodo,
    EnergyAustralia,
    Origin,
    RedEnergy
}

const _ENERGY_RETAILER_SERIALIZED_VALUES = OrderedMap<EnergyRetailer,string>([
    [EnergyRetailer.NotDisclosed, 'NOT_DISCLOSED'],
    [EnergyRetailer.Agl, 'AGL'],
    [EnergyRetailer.ClickEnergy, 'CLICK_ENERGY'],
    [EnergyRetailer.Dodo, 'DODO'],
    [EnergyRetailer.EnergyAustralia, 'ENERGY_AUSTRALIA'],
    [EnergyRetailer.Origin, 'ORIGIN'],
    [EnergyRetailer.RedEnergy, 'RED_ENERGY']
]);

export const ENERGY_RETAILER_CODEC = enumToString<EnergyRetailer>(_ENERGY_RETAILER_SERIALIZED_VALUES);
    
export const ENERGY_RETAILER_VALUES = _ENERGY_RETAILER_SERIALIZED_VALUES.keySeq().toList();

