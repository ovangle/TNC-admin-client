import moment = require('moment');
import {Moment} from 'moment';

import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'date-card',
    template: `
    <h4>
    <small class="year-display">{{_moment.format('YYYY')}}</small><br/>
    {{_moment.format('ddd, MMM\u00A0D')}}
    </h4>
    `,
    styles: [`
    :host {
        display: block;
        width: 8rem;
        background-color: #337ab7;
        color: white;
        padding-left: 1em;
        
        //border-top-left-radius: inherit;
        //border-bottom-left-radius: inherit;
    }
    
    h4 small.year-display {
        color: #e8e8e8;
    }  
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateCard {
    _moment: Moment; 
    
    @Input()
    set date(d: Date) {
        this._moment = moment(d);
    }
}

