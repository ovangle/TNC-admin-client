import {Component, Input, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

import {DefaultPipe} from '../../utils/pipes/default.pipe';

import {MemberTerm} from './term.model';
import {MEMBER_TERM_TYPE_VALUES} from './term_type.model';

@Component({
    selector: 'member-term',
    template: `
        <div class="form-group">
            <label>Type</label><br/>
            <div class="form-control-static">{{termTypeValues.get(term.type)}}</div>
        </div>
        <div class="form-group">
            <label>Joined</label><br/>
            <div class="form-control-static">{{ term.joined | date }}</div>
        </div>
        <div class="form-group">
        <label>Renewed</label><br/>
            <div class="form-control-static">{{ term.renewed | date | default: 'Never'}}</div>
        </div>
        <div class="form-group">
            <label>Expires</label><br/>
            <div class="form-control-static">{{ term.endDate | date }}</div>
        </div>
    `,
    pipes: [DefaultPipe],
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
    private termTypeValues = MEMBER_TERM_TYPE_VALUES;
    @Input() term: MemberTerm;
}
