import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {Member} from '../../../../member';
import {NamePipe} from '../../../../member/basic';

import {DependentListInput, DependentListDisplay} from '../../../../member/dependents';

import {ChemistPrescription} from './prescription.model';

@Component({
    selector: 'chemist-prescription-input',
    template: `
    <div class="form-group">
        <label for="medication-name">Medication name</label>
        <input class="form-control"
               [ngModel]="prescription.name"
               (ngModelChange)="propChanged('name', $event)">
    </div>
    
    <p>The prescription is made out to one of:/p>
    <ul class="checkbox-list">
        <li class="checkbox">
            <label>
                The member, <em>{{member.name | name}}</em>
                <input type="checkbox" [ngModel]="_isInNameOfMember">
            </label>   
        </li>
        </li class="checkbox">    
            <label>
                The member's partner, <em>{{member.name | name}}</em> 
                <input type="checkbox" [ngModel]="_isInNameOfPartner">
            </label>
        </li>     
        <li class="checkbox" *ngFor="let dependent of member.dependents.toArray()">
            <label>
                The member's dependent, <em>{{dependent.name | name}}</em>
                <input type="checkbox" 
                       [ngModel]="isInNameOfDependent(depdendent.name)">
            </label> 
        </li>    
    </li>
    
    `,
    directives: [
        DependentListInput,
        DependentListDisplay
    ],
    pipes: [NamePipe],
    styleUrls: [
        '../../../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChemistPrescriptionInput {
    @Input() member: Member;

    private _isInNameOfMember = true;
    private _isInNameOfPartner = false;


    @Input() prescription: ChemistPrescription;
    @Output() prescriptionChange = new EventEmitter<ChemistPrescription>();

    private isValidName: boolean;
    private _editingDependents: boolean = true;

    private prescriptionValueChanged(value: string) {
        let moneyValue = Number.parseFloat(value);
        if (Number.isNaN(moneyValue)) {
            return;
        }
        this.propChanged('value', moneyValue);

    }


    private propChanged(prop: string, value: any) {
        this.prescriptionChange.emit(
            <ChemistPrescription>this.prescription.set(prop, value)
        );
    }

}
