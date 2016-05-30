import {Component, Input, ChangeDetectionStrategy, ViewEncapsulation} from 'angular2/core';

import {DefaultPipe} from '../../utils/pipes/default.pipe';

import {MemberTermTypePipe} from './term_type.enum';
import {MemberTerm} from './term.record';

@Component({
    selector: 'member-term',
    template: `
        <h3>Membership term</h3>
        <label>Type</label>{{term.type | termType }}<br/>
        <label>Joined</label>{{ term.joined | date }}<br/>
        <label>Renewed</label>{{ term.renewed | date | default: 'Never'}}<br/>
        <label>Expires</label>{{ term.endDate | date }}<br/>
    `,
    pipes: [MemberTermTypePipe, DefaultPipe],
    styles: [`
        label { width: 10rem; 
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberTermComponent {
    @Input() term: MemberTerm;
}
