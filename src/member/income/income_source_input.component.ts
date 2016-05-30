import {Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";

import {IncomeSource} from './income_source.record';
import {IncomeTypeSelect} from './income_type_select.component';
import {Benefit} from './benefit.record';
import {BenefitSelect} from './benefit_select.component';
import {IncomeType} from "./income_type.enum";

@Component({
    selector: 'income-source-input',
    template: `
        <div class="form-group">
        <income-type-select [incomeType]="incomeSource.type"
                           (incomeTypeChange)="_incomeTypeChange($event)"
                           [label]="'Primary income'"
                           [disabled]="disabled">
        </income-type-select> 
        </div>
    
        <div class="form-group" [hidden]="benefitHidden">
        <benefit-select [benefit]="incomeSource.benefit"     
                       (benefitChange)="_benefitChange($event)"
                       [label]="'Benefit'"
                       [disabled]="disabled">
        </benefit-select>
        </div>
    `,
    styles: [``],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    directives: [BenefitSelect, IncomeTypeSelect],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeSourceInput {
    @Input() incomeSource: IncomeSource;
    @Output() incomeSourceChange = new EventEmitter<IncomeSource>();

    @Input() label: string;
    @Input() disabled: boolean;

    get _benefitTypeHidden(): boolean {
        return this.incomeSource.type !== IncomeType.CentrelinkBenefit;
    }

    _incomeTypeChange(value: IncomeType) {
        switch (value) {
            case IncomeType.CentrelinkBenefit:
                this.incomeSource = <IncomeSource>this.incomeSource.set('type', value);
                return;
            default:
                var incomeSource = this.incomeSource.delete('benefit');
                this.incomeSourceChange.emit(
                    <IncomeSource>incomeSource.set('type', value)
                );
        }
    }

    _benefitChange(value: Benefit) {

    }
}
