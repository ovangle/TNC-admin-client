import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    SimpleChange
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {Member} from 'member';
import {Name} from 'member/basic';

import {ChemistPrescription} from './prescription.model';

@Component({
    selector: 'chemist-prescription-input',
    template: `
    <div class="col-xs-12">
        <div class="form-group">
            <label for="medication-name">Medication name</label>
            <input class="form-control"
                    name="medication-name"
                   [ngModel]="prescription.name"
                   (ngModelChange)="propChanged('name', $event)">
        </div>
        <div *ngIf="!prescription.name" class="alert alert-danger">
            The medication name is required 
        </div>
    </div>
    
    <div class="col-xs-12">
        <label class="control-label">Recipient</label>
        <ul class="list-unstyled">
            <li *ngFor="let recipientOption of _recipientOptions" class="radio">
                <label>
                    <input type="radio" name="recipient-options"
                        [ngModel]="_selectedRecipientOption"
                        (ngModelChange)="propChanged('recipient', $event)"
                        [value]="recipientOption.value">
                    {{recipientOption.name | name}}
                </label>
            </li> 
            <li class="radio"> 
                <label>
                    <input type="radio" name="recipient-options"
                        [ngModel]="_selectedRecipientOption"
                        (ngModelChange)="propChanged('recipient', 'other')"
                        [value]="'other'">
                    Other      
                </label>
            </li> 
        </ul>
        
        <div *ngIf="prescription.recipient === null" class="alert alert-danger">
        A voucher can only be issued if the recipient is a partner or dependent of the 
        member which claimed it.
        </div>
    </div>
    
    <div class="col-xs-12">
    
    <p>Contact one of the affiliated chemists to obtain the cost of the medicine. </p>
        <div class="form-group">
            <label class="control-label">Value</label>
            <input type="number" class="form-control"
                [ngModel]="prescription.value"
                (ngModelChange)="propChanged('value', $event)">
        </div>     
        
        <div *ngIf="prescription.value === null" class="alert alert-danger">
            The cost of the prescription is not provided
        </div>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChemistPrescriptionInput {

    @Input() member: Member;

    @Input() prescription: ChemistPrescription;
    @Output() prescriptionChange = new EventEmitter<ChemistPrescription>();

    private _recipientOptions: Array<{value: string, name: Name}> = [];

    private isValidName: boolean;
    private _editingDependents: boolean = true;

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (changes.member && changes.member.currentValue) {
            this.propChanged('recipient', 'member');

            let recipientOptions: Array<{value: string, name: Name}> = [];
            recipientOptions.push({value: 'member', name: this.member.name});
            if (this.member.partner) {
                recipientOptions.push({value: 'partner', name: this.member.partner.name});
            }

            this.member.dependents.forEach(dependent => {
                recipientOptions.push({
                    value: `dependent--${dependent.id}`,
                    name: dependent.name
                });
            });

            this._recipientOptions = recipientOptions;
        }
    }



    private propChanged(prop: string, value: any) {
        let prescription: ChemistPrescription;
        if (prop === 'recipient') {
            if (isBlank(value)) {
                prescription = this.prescription.setRecipient(null);
            } else if (value === 'member') {
                prescription = this.prescription.setRecipient(this.member);
            } else if (value === 'partner') {
                prescription = this.prescription.setRecipient(this.member.partner);
            } else if (value.startsWith('dependent--')) {
                let id = value.substr('dependent--'.length);
                let dependent = this.member.dependents
                    .filter(dep => dep.id.toString() === id)
                    .first();
                prescription = this.prescription.setRecipient(dependent);
            } else {
                throw 'Invalid radio value: ' + value;
            }
        } else {
            prescription = <ChemistPrescription>this.prescription.set(prop, value);
        }
        this.prescriptionChange.emit(prescription);
    }

    get _selectedRecipientOption(): string {
        let recipient = this.prescription.recipient;
        let selectedOption: string;
        if (recipient === null) {
            selectedOption = 'other';
        } else if (recipient.kind === 'member::Member') {
            if (recipient.id === this.member.id) {
                selectedOption = 'member';
            } else if (recipient.id === this.member.partner.id) {
                selectedOption = 'partner';
            } else {
                selectedOption = 'other';
            }
        } else if (recipient.kind === 'member.dependent::Dependent') {
            let dependent = this.member.dependents
                .filter(dependent => dependent.id === recipient.id)
                .first();
            selectedOption = isBlank(dependent) ? 'other': `dependent--${dependent.id}`;
        } else {
            selectedOption = 'other';
        }
        return selectedOption;
    }
}
