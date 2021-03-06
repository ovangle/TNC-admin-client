import {Component, Input, Output, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';


@Component({
    selector: 'spinner',
    template: `
        <div class="loader"
             [style.font-size]="size || 'inherit'"
             [style.color]="color || _defaultColor"></div>
    `,
    styles: [
        require('./spinner.component.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Spinner {
    _defaultColor = 'rgb(255,255,255,0.2)';

    // A css indicator for the size. If not provided, defaults to
    // the current font size.
    @Input() size: string;

    // A css color indicator
    @Input() color: string;
}

