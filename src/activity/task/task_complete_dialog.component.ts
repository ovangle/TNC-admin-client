import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'task-complete-dialog',
    template: `
    `,
    directives: [],
    styles: [require('bootstrap/dist/css/bootstrap.css')],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCompleteDialog {
}
