import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef, SimpleChange, OnChanges
} from '@angular/core';

import {CarerRel} from './carer_rel.model';
import {REVERSE_RELATION_TYPE_VALUES} from './relation_type.model';
import {LIVING_ARRANGEMENT_VALUES} from './living_arrangement.model';



@Component({
    selector: 'carer-rel-display',
    template: `
    <div class="row">
        <ul class="list-unstyled">
            <li class="clearfix">
                <span class="display-label col-sm-4">Relation</span>
                <span class="display-value col-sm-8">{{relationType}}</span>
            </li> 
            
            <li class="clearfix">
                <span class="display-label col-sm-4">Living arrangements</span>
                <span class="display-value col-sm-8">{{livingArrangement}}</span>
            </li>
        </ul> 
    </div>
    `,
    directives: [],
    styleUrls: [
        '../../../../assets/css/bootstrap.css',
        '../../../../assets/css/details_display.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarerRelDisplay {
    @Input() rel: CarerRel;

    get relationType(): string {
        return REVERSE_RELATION_TYPE_VALUES.get(this.rel.relationType);
    }

    get livingArrangement(): string {
        return LIVING_ARRANGEMENT_VALUES.get(this.rel.livingArrangement);
    }
}
