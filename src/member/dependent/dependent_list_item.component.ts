import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {NamePipe} from '../basic';

import {Dependent} from './dependent.model';

@Component({
    selector: 'dependent-list-item',
    template: `
        <div>
            {{dependent.name | name}}
        </div>
    `,
    pipes: [NamePipe],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentListItem {
    @Input() dependent: Dependent;
}
