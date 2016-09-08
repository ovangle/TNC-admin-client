import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Address, AddressPipe} from '../address';

import {ResidentialStatus} from './residential_status.model';
import {ResidenceType, RESIDENCE_TYPE_VALUES} from './residence_type.model';
import {ResidentialStability, RESIDENTIAL_STABILITY_VALUES} from './residential_stability.model';

@Component({
    selector: 'residential-status-display',
    template: `
    <style>
    .display-label {
        text-align: right;
        font-weight: bold;
    }
    li {
        margin-bottom: 5px;
    }
    </style>
    <div class="row">
        <h3>Residential Status</h3>
        <ul class="list-unstyled">
            <li class="clearfix">
                <div class="display-label col-sm-3">Address</div>
                <div class="value col-sm-9">{{address | address}}</div>
            </li>
            <li class="clearfix">
                <span class="display-label col-sm-3">Type</span> 
                <span class="value col-sm-9">{{residenceType}}</span>
            </li>
            <li class="clearfix">
                <span class="display-label col-sm-3">Stability</span>
                <span class="value col-sm-9">{{residentialStability}}</span>
            </li>    
        </ul>
    </div>    
    `,
    directives: [],
    pipes: [AddressPipe],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResidentialStatusDisplay {

    @Input() address: Address;
    @Input() status: ResidentialStatus;

    get residenceType(): string {
        let type: ResidenceType = this.status ? this.status.type : 'NOT_DISCLOSED';
        return RESIDENCE_TYPE_VALUES.get(type);
    }

    get residentialStability(): string {
        let stability: ResidentialStability = this.status ? this.status.stability: 'NOT_DISCLOSED';
        return RESIDENTIAL_STABILITY_VALUES.get(stability);
    }

}
