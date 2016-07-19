import {
    Component, Input, ViewEncapsulation, Query, QueryList, ElementRef,
    SimpleChange, OnChanges, Renderer
} from '@angular/core';

/**
 * A component which expands upon toggling it's 'hidden' attribute.
 *
 * It has two children, a `<header>` and a `<main>`. The header contains
 * content that is visible when the element is hidden, the elements under main
 * are only visible when the element is expanded.
 *
 * If the 'main' element has an `#expando` variable, adds an 'expanded'
 * class to the `main` element when the content is expanded.
 */
@Component({
    selector: 'expander',
    template: `
        <div class="layout horizontal header-container">
            <i  class="fa fa-chevron-right" 
                [class.fa-rotate-90]="!isHidden"
                [class.disabled]="isDisabled"
                (click)="iconClick($event)"
                aria-hidden="true"></i>
            <span class="flex">
                <content select="header"></content>
            </span>
        </div>    
        <div class="expand-container"
             [class.expanded]="!isHidden">
            <content select="main"></content>
        </div>
    `,
    styles: [`
    :host {
        display: block; 
        width: 100%;
    }
    
    .header-container {
        font-size: 0;
    }
        
    i.fa {
        transition: transform 0.1s;
        display: inline-block;
        font-size: 1.2rem;
        line-height: 1.412;
        padding: 8px;
    }
    i.fa-rotate-90 {
        transition: transform 0.1s;
    }
    i.fa.disabled {
        visibility: hidden;
    }
    
    .expand-container > ::content > main {
        transition: height 0.3s;
        overflow: hidden;
    }    
    
    .expand-container:not(.expanded) > ::content > main {
        transition: height 0.3s;
        height: 0; 
    }
    
    .expand-container.expanded > ::content > main {
        transition: height 0.3s, visibility 0.2s ease-out;
    }
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/font-awesome.css'
    ],
    encapsulation: ViewEncapsulation.Native
})
export class Expander implements OnChanges {
    @Input('disabled') isDisabled: boolean = false;
    @Input('hidden') isHidden: boolean = true;

    private mains: QueryList<ElementRef>;
    private _renderer: Renderer;

    ngOnChanges(changes: { [attr: string]: SimpleChange}) {
        if (changes['isHidden']) {
            this._setMainExpanded(changes['isHidden'].currentValue);
        }
    }

    constructor(@Query('expando') mains: QueryList<ElementRef>,
                renderer: Renderer)  {
        this.mains = mains;
        this._renderer = renderer;
    }

    _setMainExpanded(expanded: boolean) {
        this.mains.forEach((main) => {
            this._renderer.setElementClass(main.nativeElement, 'expanded', !this.isHidden);
        });
    }

    iconClick(event: Event) {
        if (!this.isDisabled) {
            this.isHidden = !this.isHidden;
            this._setMainExpanded(this.isHidden);
        }
    }

}
