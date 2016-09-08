import {List, Set} from 'immutable';

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
import {DependentCard} from './dependent_card.component';

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
                <div *ngIf="isEditing(dependent)">
                    <dependent-input        
                        [carers]="carers"
                        [dependent]="dependent"
                        (commit)="dependentChanged(i, $event)"
                        (cancel)="remove(dependent)">
                    </dependent-input>
                </div>      
                <div *ngIf="!isEditing(dependent)">
                    <dependent-card
                        [dependent]="dependent">
                        <div class="btn-group">
                            <button class="btn" (click)="edit(dependent)">
                                <i class="fa fa-pencil"></i> Edit
                            </button>
                            <button class="btn btn-danger">
                                <i class="fa fa-eraser"></i> Remove
                            </button>
                        </div>
                    </dependent-card>
                </div>
            </li>
        </ul>
        <button class="btn btn-primary" (click)="addDependent()"><i class="fa fa-plus"></i>Add</button>
    </fieldset>
    `,
    directives: [DependentInput, DependentCard],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    providers: [DependentManager],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentListInput {
    @Input() carers: List<Carer>;

    @Input() dependents: List<Dependent>;
    @Output() dependentsChange = new EventEmitter<List<Dependent>>();

    private _editDependentIds: Set<number>;

    constructor(
        private dependentManager: DependentManager
    ) {
        this._editDependentIds = Set<number>();
    }

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

    private edit(dependent: Dependent) {
        this._editDependentIds = this._editDependentIds.add(dependent.id);
    }

    private isEditing(dependent: Dependent): boolean {
        if (dependent.id === null) {
            return true;
        }
        return this._editDependentIds.contains(dependent.id);
    }

    private cancelEdit(dependent: Dependent) {
        if (dependent.id === null) {
            return this.remove(dependent);
        } else {
            this._editDependentIds = this._editDependentIds.remove(dependent.id);
        }
    }

    private remove(dependent: Dependent) {
        var index = this.dependents.findIndex(dep => dep.id === dependent.id);
        this._editDependentIds.remove(dependent.id);
        this.dependentsChange.emit(this.dependents.remove(index));
    }

    private dependentChanged(i: number, value: Dependent) {
        this.dependentsChange.emit(this.dependents.set(i, value));
    }
}
