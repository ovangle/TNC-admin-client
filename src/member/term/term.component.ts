import {Component, Input, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

import {DefaultPipe} from '../../utils/pipes/default.pipe';

import {MemberTermTypePipe} from './term_type.enum';
import {MemberTerm} from './term.record';

@Component({
    selector: 'member-term',
    template: `
        <div class="form-group">
            <label>Type</label><br/>
            <div class="form-control-static">{{term.type | termType }}</div>
            
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
