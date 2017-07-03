import moment = require('moment');
import {
    Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation,
    ChangeDetectionStrategy, ViewChild, OnChanges
} from "@angular/core";

//TODO: Validity

@Component({
    selector: 'year-input',
    template: `
    <style>
    input.year-input {
        padding: 0;
        width: 5em;
        border: 0;
        outline: none;
        font-weight: 600;
    }
    
    input[type="number"]::-webkit-outer-spin-button, 
    input[type="number"]::-webkit-inner-spin-button {
        display: none;
    } 
    </style>
    <input #input class="year-input" type="number" 
           (keydown)="_handleEnterOrEsc($event)"
           [ngModel]="year" 
           (ngModelChange)="_inputYear = $event"
           (blur)="commit()"> 
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearInput implements OnChanges {
    @Input() year: number;
    @Output() yearChange = new EventEmitter<number>();

    private _inputYear: number;

    @ViewChild('input') _yearInput: ElementRef;
    get yearInput(): HTMLInputElement {
        return this._yearInput.nativeElement;
    }

    ngOnChanges(changes: any) {
        if (changes['year']) {
            this._inputYear = changes['year'].currentValue;
        }
    }

    private _handleEnterOrEsc(event: KeyboardEvent) {
        switch (event.key) {
            case 'Tab':
            case 'Enter':
                event.stopImmediatePropagation();
                return this.commit();
            case 'Escape':
                event.stopImmediatePropagation();
                return this.cancel();
        }
    }

    cancel() {
        this._inputYear = this.year;
    }

    commit() {
        if (Number.isNaN(this._inputYear)) {
            // Don't commit an invalid year.
            return;
        }
        this.year = this._inputYear;
        this.yearChange.emit(this.year);
    }
}
