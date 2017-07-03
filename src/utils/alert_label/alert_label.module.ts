import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlertLabelComponent} from './alert_label.component';
import {AlertLabels} from './alert_labels.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AlertLabelComponent,
        AlertLabels
    ],
    exports: [
        AlertLabels
    ]
})
export class AlertLabelModule {}

