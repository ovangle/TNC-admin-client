import {Component, Input, Output, ViewEncapsulation, EventEmitter} from "angular2/core";
import {YesNo} from '../../utils/pipes/yes_no.pipe';
import {IncomeSourcePipe, IncomeSource} from './income_source.record';
import {IncomeInfo} from "./income_info.record";
import {IncomeSourceInput} from "./income_source_input.component";
import {ProofOfLowIncomeInput} from './proof_of_low_income_input.component';

@Component({
    selector: 'income-info',
    template: `
        <h3>Income</h3>
        <proof-of-low-income-input
            [disabled]="disabled"
            [flags]="incomeInfo.proofOfLowIncomeFlags"
            (flagsChange)="_proofOfLowIncomeFlagsChanged($event)">
        </proof-of-low-income-input>
        
        <income-source-input [label]="'Primary income'"
                             [disabled]="disabled"
                             [incomeSource]="incomeInfo.incomeSource"
                             (incomeSourceChange)="_incomeSourceChange($event)">
        </income-source-input> 
        
    `,
    directives: [IncomeSourceInput, ProofOfLowIncomeInput],
    pipes: [YesNo, IncomeSourcePipe],
    styles: [`
        label { width: 25rem; }
        
        .low-income-proof {
            background-color: #eee;
        }
        
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native
})
export class IncomeInfoComponent {
    @Input() incomeInfo: IncomeInfo;
    @Output() incomeInfoChange = new EventEmitter<IncomeInfo>();

    _incomeSourceChange(incomeSource: IncomeSource) {
        this.incomeInfoChange.emit(
            <IncomeInfo>this.incomeInfo.set('incomeSource', incomeSource)
        );
    }
    
    _proofOfLowIncomeFlagsChanged(newFlags: number) {
        this.incomeInfoChange.emit(
            <IncomeInfo>this.incomeInfo.set('proofOfLowIncomeFlags', newFlags)
        );
    }

}
