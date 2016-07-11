import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {
    Contact, ContactInput,
    Income, IncomeInput,
    Name, NameInput,
    Gender, GenderSelect
} from '../basic';

import {Partner} from './partner.model';

@Component({
    selector: 'partner-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        
        <name-input [label]="'Name'"
                    [disabled]="disabled"
                    [name]="partner.name"
                    (nameChange)="propChanged('name', $event)">
        </name-input>
        
        <gender-select [label]="'Gender'"
                       [disabled]="disabled"
                       [gender]="partner.gender"
                       (genderChange)="propChanged('gender', $event)">
        </gender-select>
        
        <contact-input [label]="'Contact'"
                       [disabled]="disabled"
                       [contact]="partner.contact"
                       (contactChange)="propChanged('contact', $event)">
        </contact-input>
        
        <income-input [label]="'Income'"
                      [disabled]="disabled"
                      [income]="partner.income"
                      (incomeChange)="propChanged('income', $event)">
        </income-input>
    </fieldset>
    `,
    directives: [NameInput, ContactInput, IncomeInput, GenderSelect],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerInput {
    @Input() partner: Partner;
    @Output() partnerChange = new EventEmitter<Partner>();

    @Input() label: string;
    @Input() disabled: boolean;

    private propChanged(prop: string, value: any) {
        this.partnerChange.emit(
            <Partner>this.partner.set(prop, value)
        );
    }
}
