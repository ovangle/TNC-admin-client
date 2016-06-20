import {OrderedMap} from 'immutable';
import {Pipe, PipeTransform} from '@angular/core';

import {ArgumentError} from 'caesium-model/exceptions';

import {EnergyRetailer} from './energy_retailer.model';

@Pipe({name: 'energyRetailer'})
export class EnergyRetailerPipe implements PipeTransform {
    static _DISPLAY_VALUES = OrderedMap<EnergyRetailer, string>([
        [EnergyRetailer.NotDisclosed, 'Not disclosed'],
        [EnergyRetailer.Agl, 'AGL'],
        [EnergyRetailer.ClickEnergy, 'Click Energy'],
        [EnergyRetailer.Dodo, 'Dodo'],
        [EnergyRetailer.EnergyAustralia, 'Energy Australia'],
        [EnergyRetailer.Origin, 'Origin'],
        [EnergyRetailer.RedEnergy, 'Red Energy']
    ]);

    transform(value: any, ...args: any[]) {
        var displayValues = EnergyRetailerPipe._DISPLAY_VALUES;
        if (displayValues.contains(value)) {
            return displayValues.get(value);
        }
        throw new ArgumentError('Invalid EnergyRetailer value: ' + value);
    }

}
