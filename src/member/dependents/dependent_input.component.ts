import {List, OrderedMap} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    SimpleChange
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {GENDER_VALUES} from '../basic';

import {Dependent, dependent} from './dependent.model';
import {Carer} from './carer.model';
import {CarerRel} from './carer_rel/carer_rel.model';
import {DependentManager} from './dependent.manager';


@Component({
    selector: 'dependent-input',
    template: `
    <style>
    enum-select2 + date-input, 
    button + button {
        margin-left: 30px;
    } 
    </style>
    <div class="well">
        <name-input 
            [name]="dependent.name"
            (nameChange)="propChanged('name', $event)"></name-input>
        
        <div class="layout horizontal">
            <enum-select2 class="flex"
                          [label]="'Gender'"
                          [enumValues]="genderValues"
                          [value]="dependent.gender"
                          (valueChanged)="propChanged('gender', $event)"></enum-select2>
                          
            <date-input class="flex"
                        [label]="'Date of Birth'" 
                        [date]="dependent.dateOfBirth"                
                        (dateChange)="propChanged('dateOfBirth', $event)"
                        [defaultToday]="false">
            </date-input>
                        
        </div>
        
        <ul class="list-unstyled">
            <li *ngFor="let carerRel of dependent.carerRels.toArray(); let i=index"> 
                <carer-rel-input
                    [carerRel]="carerRel"
                    (carerRelChange)="carerRelChanged(i, $event)">
                </carer-rel-input>
            </li>
        </ul>
        
        <div class="layout horizontal center-justified">
            <button class="btn btn-primary" (click)="save()" >
                <i class="fa fa-save"></i> Save
            </button>
            <button class="btn" (click)="cancel.emit(true)">
                <i class="fa fa-close"></i> Reset
            </button>
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentInput {
    private genderValues = GENDER_VALUES;
    @Input() carers: List<Carer>;

    @Input() dependent: Dependent;

    @Output() commit = new EventEmitter<Dependent>();
    @Output() cancel = new EventEmitter<any>();

    constructor(
        private dependentManager: DependentManager
    ) { }

    ngOnInit() {
        let carerRels = this.carers
            .map(carer => new CarerRel({carer: carer}))
            .toList();

        if (isBlank(this.dependent)) {
            this.dependent = dependent({carerRels: carerRels});
        }
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
        console.log('carer rel changed');
        var carerRels = this.dependent.carerRels.set(index, rel);
        this.propChanged('carerRels', carerRels);
    }

    save() {
        return this.dependentManager.save(this.dependent).forEach(dep => {
        })

    }
}
