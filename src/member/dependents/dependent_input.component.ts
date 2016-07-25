import {List, OrderedMap} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    SimpleChange
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';
import {EnumSelect2} from '../../utils/enum';

import {Member} from '../member.model';
import {NameInput, NamePipe, GENDER_VALUES} from '../basic';

import {Dependent} from './dependent.model';
import {Carer} from './carer.model';
import {CarerRel} from './carer_rel/carer_rel.model';
import {CarerRelInput} from './carer_rel/carer_rel_input.component';
import {DependentManager} from './dependent.manager';

@Component({
    selector: 'dependent-input',
    template: `
    <div class="well">
        <name-input 
            [name]="dependent.name"
            (nameChange)="propChanged('name', $event)"></name-input>
        
        <div class="layout horizontal">
            <enum-select2 [enumValues]="genderValues"
                          [value]="dependent.gender"
                          (valueChanged)="propChanged('gender', $event)"></enum-select2>
                          
            <date-input [label]="'Date of Birth'" 
                        [value]="dependent.dateOfBirth"                
                        (valueChange)="propChanged('dateOfBirth', $event)"
                        [defaultToday]="false">
            </date-input>
                        
        </div>
        
        <ul class="list-unstyled">
            <li *ngFor="let carerRel of dependent.carerRels; let i=index"> 
                <carer-rel-input
                    [carerRel]="carerRel"
                    (carerRelChange)="carerRelChanged(i, $event)">
                </carer-rel-input>
            </li>
        </ul>
    </div>
    `,
    directives: [
        NameInput, CarerRelInput, EnumSelect2
    ],
    pipes: [NamePipe],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentInput {
    private genderValues = GENDER_VALUES;
    @Input() carers: List<Carer>;

    private dependent: Dependent;

    constructor(
        private dependentManager: DependentManager
    ) { }

    ngOnInit() {
        var carerRels = this.carers
            .map(carer => new CarerRel({carer: carer}))
            .toList();

        this.dependent = this.dependentManager.create(Dependent, {
            carerRels: carerRels
        });
    }

    ngOnChanges(changes: {[prop: string]: SimpleChange}) {
        if (!isBlank(this.dependent) && changes['carers']) {
            var carers: List<Carer> = changes['carers'].currentValue;
            this.dependent = this.dependent.setCarers(carers);
        }
    }

    private propChanged(prop: string, value: any) {
        this.dependent = <Dependent>this.dependent.set(prop, value);
    }

    private carerRelChanged(index: number, rel: CarerRel) {
        var carerRels = this.dependent.carerRels.set(index, rel);
        this.propChanged('carerRels', carerRels);
    }

    save() {
        // Check which

    }
}
