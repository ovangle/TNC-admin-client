import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {CarerRel} from './carer_rel.model';

import {RELATION_TYPE_VALUES} from './relation_type.model';
import {LIVING_ARRANGEMENT_VALUES} from './living_arrangement.model';


@Component({
    selector: 'carer-rel-input',
    template: `
    <style>
    :host { display: block; } 
    </style>
    <fieldset>
        <legend>Relationship to {{carerRel.carer.name | name}}</legend>
        <enum-select2
            [label]="'Relation type'"
            [enumValues]="relationTypeValues"
            [value]="carerRel.relationType"
            (valueChange)="propChanged('relationType', $event)">
        </enum-select2>
            
        <enum-select2     
            [label]="'Living arrangement'"
            [enumValues]="livingArrangementValues"
            [value]="carerRel.livingArrangement"
            (valueChange)="propChanged('livingArrangement', $event)">
        </enum-select2>
    </fieldset>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarerRelInput {
    private relationTypeValues = RELATION_TYPE_VALUES;
    private livingArrangementValues = LIVING_ARRANGEMENT_VALUES;

    @Input() carerRel: CarerRel;
    @Output() carerRelChange = new EventEmitter<CarerRel>();

    ngOnChanges(changes: any) {

    }

    private propChanged(prop: string, value: any) {
        console.log('propChanged', prop, ' ', value);
        this.carerRelChange.emit(
            <CarerRel>this.carerRel.set(prop, value)
        );
    }
}
