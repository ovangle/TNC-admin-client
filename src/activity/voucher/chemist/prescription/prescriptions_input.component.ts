import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    SimpleChange, OnChanges
} from '@angular/core';

import {Member, MemberManager} from '../../../../member';

import {ChemistPrescription} from './prescription.model';
import {ChemistPrescriptionInput} from './prescription_input.component';

@Component({
    selector: 'chemist-prescriptions-input',
    template: `
    <button (click)="addPrescription()" class="btn btn-default">
        <i class="fa fa-plus"></i> Add
    </button>


    <div *ngIf="prescriptions.isEmpty()" class="alert alert-danger">
    At least one prescription must be presented
    </div>

    <div *ngFor="let prescription of _prescriptions; let i=index">
        <chemist-prescription-input
            [member]="member"
            [prescription]="prescription"
            (prescriptionChange)="itemChanged(i, $event)">
        </chemist-prescription-input>
    </div>
    `,
    directives: [
        ChemistPrescriptionInput
    ],
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('font-awesome/css/font-awesome.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChemistPrescriptionsInput implements OnChanges {
    @Input() member: Member;

    @Input() prescriptions: List<ChemistPrescription>;
    @Output() prescriptionsChange = new EventEmitter<List<ChemistPrescription>>();

    private _prescriptions = <ChemistPrescription[]>[];

    constructor(
        private memberManager: MemberManager
    ) { }

    ngOnInit() {
        this.member.resolvePartner(this.memberManager).forEach(member => {
            this.member = member;
        });
    }



    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (changes['prescriptions']) {

            this._prescriptions.length = this.prescriptions.count();
            this.prescriptions.forEach((item, i) => {
                this._prescriptions[i] = item;
            })
        }
    }

    addPrescription() {
        this.prescriptionsChange.emit(
            this.prescriptions.push(new ChemistPrescription())
        );
    }

    itemChanged(index: number, prescription: ChemistPrescription) {
        this.prescriptionsChange.emit(
            this.prescriptions.set(index, prescription)
        );
    }


}
