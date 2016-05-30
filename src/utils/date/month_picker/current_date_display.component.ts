import moment = require('moment');
import {Moment} from 'moment';

import {Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from 'angular2/core';

@Component({
    selector: 'current-date-display',
    template: `
    <h3>
        <small class="year-display">{{_moment.format('YYYY')}}</small><br/>
        {{_moment.format('ddd, MMM\u00A0D')}}
    </h3> 
    `,
    styles: [`   
    :host {
        display: block;
        width: 12rem;
        background-color: #337ab7;
        color: white;
        padding-left: 1em;
        
        //border-top-left-radius: inherit;
        //border-bottom-left-radius: inherit;
    }
    
    h3 small.year-display {
        color: #d0d0d0;
    }  
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/flex.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentDateDisplay {
    private _moment: Moment;

    @Input()
    get date() { return this._moment.toDate() }
    set date(date: Date) {
        this._moment = moment(date);
        console.log('set date');
    }
}
