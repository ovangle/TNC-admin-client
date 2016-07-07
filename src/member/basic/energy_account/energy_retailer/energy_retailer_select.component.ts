import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {EnumSelect} from "../../../../utils/components/enum_select.component";
import {EnergyRetailer, ENERGY_RETAILER_VALUES} from './energy_retailer.model';
import {EnergyRetailerPipe} from './energy_retailer.pipe';

@Component({
    selector: 'energy-retailer-select',
    template: `
    <enum-select [label]="label"
                 [disabled]="disabled"
                 [enumValues]="energyRetailerValues"
                 [enumPipe]="_energyRetailerPipe"
                 [value]="value"
                 (valueChange)="energyRetailerChange.emit($event)">
    </enum-select>
    `,
    directives: [EnumSelect],
    providers: [EnergyRetailerPipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyRetailerSelect {
    energyRetailerValues = ENERGY_RETAILER_VALUES;

    @Input() energyRetailer: EnergyRetailer;
    @Output() energyRetailerChange = new EventEmitter<EnergyRetailer>();

    @Input() label: string;
    @Input() disabled: boolean;

    _energyRetailerPipe: EnergyRetailerPipe;

    constructor(energyRetailerPipe: EnergyRetailerPipe) {
        this._energyRetailerPipe = energyRetailerPipe;
    }
}
