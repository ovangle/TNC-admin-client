import {Component, Input, ViewEncapsulation, DoCheck, ChangeDetectionStrategy} from '@angular/core';
import {List} from 'immutable';

import {AlertLabel, CheckForAlertLabels} from './alert_label/alert_label';
import {AlertLabelComponent} from "./alert_label/alert_label.component";

export {AlertLabel, LabelSeverity} from './alert_label/alert_label';

@Component({
    selector: 'alert-labels',
    template: `
    <ul class="list-inline"> 
        <li *ngFor="let label of labels">
            <alert-label [label]="label"></alert-label>           
        </li>
    </ul>     
    `,
    styles: [`
    ul.list-inline { margin: 0; }
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
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
