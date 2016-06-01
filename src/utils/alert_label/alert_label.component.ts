import {List} from 'immutable';

import {Component, Input, OnChanges, SimpleChange, ViewEncapsulation} from "@angular/core";
import {AlertLabel, LabelSeverity} from "./alert_label";


@Component({
    selector: 'alert-label',
    template: `
        <span class="label" [ngClass]="labelClasses">{{label.text}}</span>
    `,
    styles: [`
    :host { 
        display: inline-block; 
    }
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native
})
export class AlertLabelComponent implements OnChanges {
    @Input() label:AlertLabel;
    labelClasses:{ [cls:string]:boolean };

    constructor() {
        this.labelClasses = {};
    }

    ngOnChanges(changes:{ [propName:string]:SimpleChange}) {
        if (changes['label']) {
            this.labelClasses = {
                'label-info': this.label.severity === LabelSeverity.Info,
                'label-warning': this.label.severity === LabelSeverity.Warning,
                'label-danger': this.label.severity === LabelSeverity.Danger
            };
        }
    }
}

