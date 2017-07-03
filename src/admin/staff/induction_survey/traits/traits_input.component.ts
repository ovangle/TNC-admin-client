import {List, Set} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {StaffType} from '../../type';
import {predefinedTraits} from './traits.model';


@Component({
    selector: 'staff-traits-input',
    template: `
    <fieldset>
        <legend>Personality Traits</legend>
        <checkbox-array
            [selectedValues]="traits"
            (selectedValuesChange)="traitsChange.emit($event)"
            
            [values]="predefinedTraits"
            [allowOther]="true">
        </checkbox-array>    
    </fieldset>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffTraitsInput {
    @Input() staffType: StaffType;

    @Input() traits: Set<string>;
    @Output() traitsChange = new EventEmitter<Set<string>>();

    predefinedTraits: List<string>;

    ngOnInit() {
        this.predefinedTraits = predefinedTraits(this.staffType);
    }

}
