import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {MemberTerm} from './term.model';

@Component({
    selector: 'member-term-display',
    template: `
        <div class="alert alert-warning">
            <p><strong>Member since</strong> {{term?.joined | date }}</p>
            <p><strong>Renewed</strong> {{term?.renewed | date}}</p>    
            <p><strong>Expires</strong> {{term?.expires | date}}</p>
            
            <p class="clearfix">
                <button class="btn btn-default pull-right" 
                        (click)="renew.emit(true)">
                    <i class="fa fa-pencil-square-o"></i> Renew
                </button>
            </p>
        </div>
    `,
    directives: [],
    styles: [`
    :host {
        display: block;
    }    
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
        'assets/css/bootstrap.css',
        'assets/css/flex.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberTermDisplay {
    @Input() term: MemberTerm;
    @Output() renew = new EventEmitter<any>();

}
