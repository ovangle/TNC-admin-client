import {Component, Input, ViewEncapsulation, DoCheck, ChangeDetectionStrategy} from '@angular/core';
import {List} from 'immutable';

import {isBlank} from '../../../../caesium-core/lang';

import {AlertLabel, LabelSeverity, CheckForAlertLabels} from './alert_label';
export {AlertLabel, LabelSeverity, CheckForAlertLabels};

@Component({
    selector: 'alert-labels',
    template: `
    <style>
    ul.list-inline { margin: 0; } 
    </style>
    <ul class="list-inline"> 
        <li *ngFor="let label of labels">
            <alert-label [label]="label"></alert-label>           
        </li>
    </ul>     
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertLabels {
    @Input() model: CheckForAlertLabels;

    get labels(): Array<AlertLabel> {
        if (isBlank(this.model))
            return [];
        return this.model.checkForAlertLabels().flatten().toArray();
    }

}
