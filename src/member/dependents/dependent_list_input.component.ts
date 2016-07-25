import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    SimpleChange
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';
import {StateException} from 'caesium-model/exceptions';


import {Carer} from './carer.model';
import {Dependent} from './dependent.model';
import {DependentManager} from './dependent.manager';
import {DependentInput} from './dependent_input.component';

@Component({
    selector: 'dependent-list-input',
    template: `
    <fieldset>
        <legend>Dependents</legend>
        <div *ngIf="dependents.isEmpty()">
            No dependents 
        </div>
        <ul class="list-unstyled">
            <li *ngFor="let dependent of dependents.toArray(); let i=index">
                <div [ngSwitch]="dependent.id === null">
                    <dependent-input        
                        *ngSwitchCase="true" 
                        [carers]="carers"
                        [dependent]="dependent"
                        (dependentChange)="dependentChanged(i, $event)">
                    </dependent-input>
                    <dependent-card
                        *ngSwitchCase="false"
                        [carers]="carers"
                        [dependent]="dependent"
                        (dependentChange)="dependentChanged(i, $event)">
                    </dependent-card>
                </div>
            </li>
        </ul>
        <button class="btn btn-primary" (click)="addDependent()"><i class="fa fa-plus"></i>Add</button>
    </fieldset>
    `,
    directives: [DependentInput],
    providers: [DependentManager],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentListInput {
    @Input() carers: List<Carer>;

    @Input() dependents: List<Dependent>;
    @Output() dependentsChange = new EventEmitter<List<Dependent>>();

    constructor(
        private dependentManager: DependentManager
    ) {}

    ngOnInit() {
        if (isBlank(this.carers)) {
            throw new StateException(
                `<dependent-list-input> carers must be provided and non-null`
            );
        }
        if (isBlank(this.dependents)) {
            throw new StateException(
                `<dependent-list-input> dependents must be provided and non-null`
            );
        }
    }

    private addDependent() {
        this.dependentsChange.emit(
            this.dependents.push(this.dependentManager.create(Dependent, {}))
        );
    }

    private dependentChanged(i: number, value: Dependent) {
        this.dependentsChange.emit(this.dependents.set(i, value));
    }
}
