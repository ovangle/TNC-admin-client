import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {BenefitType, BenefitTypeSelect} from './type';
import {Benefit} from './benefit.model';

@Component({
    selector: 'benefit-input',
    template: `
    <benefit-type-select 
            [label]="'Type'"
            [disabled]="disabled"
            [benefitType]="benefit.type"
            (benefitTypeChange)="_benefitTypeChanged($event)">
    </benefit-type-select>        
    
    <div *ngIf="_isOtherBenefitType" class="form-control">
        <label for="other-type-input">Description</label>
        <input type="text" id="other-type-input"
                [ngModel]="benefit.otherType" 
                (ngModelChange)="_otherTypeChanged($event)">
    </div>
    `,
    directives: [BenefitTypeSelect],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class BenefitInput {
    @Input() benefit: Benefit;
    @Output() benefitChange = new EventEmitter<Benefit>();

    @Input() label: string;
    @Input() disabled: boolean;

    get _isOtherBenefitType(): boolean {
        return this.benefit.type === BenefitType.Other;
    }

    _benefitTypeChanged(benefitType: BenefitType) {
        this.benefitChange.emit(
            <Benefit>this.benefit.set('type', benefitType)
        );
    }

    _otherTypeChanged(otherType: string) {
        this.benefitChange.emit(
            <Benefit>this.benefit.set('otherType', otherType)
        );
    }
}
