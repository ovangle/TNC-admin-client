import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Carer} from './carer.model';

import {Dependent} from './dependent.model';
import {DependentDisplay} from './dependent_display.component';

@Component({
    selector: 'dependent-list-display',
    template: `
    <div class="row">
        <div class="display-label col-sm-3">Dependents</div>
        <div class="display-value col-sm-9"> 
            <ul class="list-unstyled">
                <li *ngFor="let dependent of dependents.toArray()">
                    <dependent-display [dependent]="dependent"></dependent-display> 
                </li>
            </ul>
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentListDisplay {
    /// If non-blank, only the relation to this specific carer will be
    /// displayed in the dependents.
    @Input() carer: Carer;

    @Input() dependents: List<Dependent>;
}
