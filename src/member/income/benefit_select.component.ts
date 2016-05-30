import {List, OrderedMap} from 'immutable';

import {Component, Input, Output, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter} from "angular2/core";
import {BenefitType, BENEFIT_TYPE_VALUES, BenefitTypePipe} from "./benefit_type.enum";
import {Benefit} from './benefit.record';

import {OtherSelect, OtherSelection, OtherSelectOption} from '../../utils/components/other_select.component';

@Component({
    selector: 'benefit-select',
    template: `
        <other-select [options]="benefitTypes"
                      [selection]="_selection"
                      (selectionChange)="_selectionChange($event)"
                      [label]="label"
                      [disabled]="disabled">
        </other-select>
    `,
    directives:[OtherSelect],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    providers: [BenefitTypePipe],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenefitSelect {
    _benefitMap: OrderedMap<BenefitType, OtherSelectOption>;
    benefitTypes: List<OtherSelectOption>;

    @Input() benefit: Benefit;
    @Output() benefitChange = new EventEmitter<Benefit>();

    @Input() label: string;
    @Input() disabled: boolean;

    get _selection(): OtherSelection {
        var option = this._benefitMap.get(this.benefit.type);
        return {option: option, otherValue: this.benefit.otherType};
    }

    private _benefitTypePipe: BenefitTypePipe;

    constructor(benefitTypePipe: BenefitTypePipe) {
        this._benefitTypePipe = benefitTypePipe;
        this._benefitMap = OrderedMap<BenefitType, OtherSelectOption>(
            BENEFIT_TYPE_VALUES
            .map<[BenefitType, OtherSelectOption]>((value) => {
                var option = {
                    id: value,
                    displayText: this._benefitTypePipe.transform(value, []),
                    isOther: value === BenefitType.Other
                };
                return [value, option];
            })
        );
        this.benefitTypes = this._benefitMap.valueSeq().toList();
   }

    _selectionChange(selection: OtherSelection) {
        //TODO: For testing purposes. Don't set benefit here
        this.benefit = <Benefit>this.benefit
            .set('type', selection.option.id)
            .set('otherType', selection.otherValue);
        this.benefitChange.emit(
            <Benefit>this.benefit
                .set('type', selection.option.id)
                .set('otherType', selection.otherValue)
        );
    }
}

