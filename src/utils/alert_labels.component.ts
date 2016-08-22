import {Component, Input, ViewEncapsulation, DoCheck, ChangeDetectionStrategy} from '@angular/core';
import {List} from 'immutable';

import {AlertLabel, LabelSeverity, CheckForAlertLabels} from './alert_label/alert_label';
import {AlertLabelComponent} from "./alert_label/alert_label.component";

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
    styleUrls: ['../../assets/css/bootstrap.css'],

    directives: [AlertLabelComponent],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertLabels implements DoCheck{
    @Input() model: CheckForAlertLabels;
    labels: List<AlertLabel>;

    ngDoCheck() {
        this.labels = this.model.checkForAlertLabels()
            .flatten()
            .toList();
    }
}
