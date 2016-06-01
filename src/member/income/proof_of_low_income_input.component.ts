import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

import {
    isPensionerConcessionCardSighted, isLowIncomeHealthCareCardSighted,
    setPensionerConcessionCardSighted, setLowIncomeHealthCareCardSighted
} from './proof_of_low_income.flags';

@Component({
    selector: 'proof-of-low-income-input',
    template: `
        <div class="form-group"> 
            <label>
            <input type="checkbox" 
                   [disabled]="disabled"
                   [ngModel]="_isLowIncomeHealthCareCardSighted"
                   (ngModelChange)="_lowIncomeHealthCareCardSightedChanged($event)">
            Low income health care card sighted
            </label>
            
            <label>
            
            <input type="checkbox" 
                   [disabled]="disabled"
                   [ngModel]="_isPensionerConcessionCardSighted"
                   (ngModelChange)="_pensionerConcessionCardSightedChanged($event)">
            Pensioner concession card sighted
            </label>       
        </div>
        
    `,
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProofOfLowIncomeInput {
    @Input() flags: number;
    @Output() flagsChange= new EventEmitter<number>();

    @Input() disabled: boolean;
    
    get _isPensionerConcessionCardSighted(): boolean {
        return isPensionerConcessionCardSighted(this.flags);
    }

    get _isLowIncomeHealthCareCardSighted(): boolean {
        return isLowIncomeHealthCareCardSighted(this.flags);
    }


    _pensionerConcessionCardSightedChanged(newValue: boolean) {
        this.flagsChange.emit(
            setPensionerConcessionCardSighted(this.flags, newValue)
        );
    }

    _lowIncomeHealthCareCardSightedChanged(newValue: boolean) {
        this.flagsChange.emit(
            setPensionerConcessionCardSighted(this.flags, newValue)
        );
    }
}
