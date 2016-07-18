import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {EnumSelect2} from '../../utils/enum';

import {
    Contact, ContactInput,
    Income, IncomeInput,
    Name, NameInput,
    Gender, GENDER_VALUES
} from '../basic';

import {Partner} from './partner.model';
import {PartnerSearchDropdown} from './search/search_dropdown.component';

@Component({
    selector: 'partner-input',
    template: `
    <partner-search-dropdown *ngIf="!partner"></partner-search-dropdown>

    <fieldset *ngIf="partner">
        <legend>{{label}}</legend>
        
        <name-input [label]="'Name'"
                    [disabled]="disabled"
                    [name]="partner.name"
                    (nameChange)="propChanged('name', $event)">
        </name-input>
        
        <enum-select2 [label]="'Gender'"
                      [enumValues]="genderValues"
                      [value]="partner.gender"
                      (valueChange)="propChanged('gender', $event)"></enum-select2>
        
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
    directives: [NameInput, ContactInput, IncomeInput, EnumSelect2, PartnerSearchDropdown],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerInput {
    private genderValues = GENDER_VALUES;

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
