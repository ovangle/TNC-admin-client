import {List, Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ViewChild, ElementRef
} from '@angular/core';


@Component({
    selector: 'checkbox-array',
    template: `
    <style>
    div.checkbox-inline.item-check {
        width: 25%;
        margin-left: 0;
    }
    .other-button > button.btn {
        position: absolute;
        margin-top: 3px;
        margin-left: -20px;
        height: 12px;
        width: 12px;
        padding: 2px 2px;
        font-size: 6px;
        line-height: normal;
        text-indent: 0px;   
        
    }
    div.predefined-values {
        margin-bottom: 0;
    }    
    input[type=text] {
        height: 1.2em;
        width: auto;
        border: none;
        border-bottom: 1px solid black;
    } 
    </style>
    <div class="checkbox-inline item-check" *ngFor="let item of values.toArray()">
        <label>
            <input type="checkbox" [ngModel]="_hasItem(item)" (ngModelChange)="_toggleItem(item, $event)">
            {{item}}
        </label>
    </div>
    <div class="checkbox-inline item-check" *ngIf="_otherValueText !== null">
        <label>
            <input type="checkbox" [ngModel]="true"> 
            <input #otherValueInput type="text" [(ngModel)]="_otherValueText"
                              (blur)="commitOther()">
        </label>
    </div>
    <div *ngIf="allowOther" class="checkbox-inline item-check other-button">
        <button class="btn btn-primary btn-sm"
                (click)="addOther()">
            <i class="fa fa-plus"></i>
        </button> 
        <label><em>Add other</em></label>
    </div> 
    `,
    directives: [],
    styleUrls: [
        '../../../assets/css/font-awesome.css',
        '../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxArray {

    @Input() selectedValues: Set<string>;
    @Output() selectedValuesChange = new EventEmitter<Set<string>>();

    /// All values that can be selected via checkboxes
    @Input() values: List<string>;

    /// Whether custom values can be entered into the array
    @Input() allowOther: boolean;

    @ViewChild('otherValueInput') otherValueInput: ElementRef;

    _otherValueText: string = null;

    private _addItem(item: string) {
        console.log('selectedValues', this.selectedValues.toArray());
        this.selectedValuesChange.emit(this.selectedValues.add(item));
    }

    private _removeItem(item: string) {
        this.selectedValuesChange.emit(this.selectedValues.remove(item));
    }

    private _toggleItem(item: string, value: boolean) {
        if (value) {
            this._addItem(item);
        } else {
            this._removeItem(item);
        }
    }

    private _hasItem(item: string) {
        return this.selectedValues.contains(item);
    }

    private addOther() {
        if (this._otherValueText !== null) {
            this.commitOther();
        }
        this._otherValueText = '';
        setTimeout(() => {
            this.otherValueInput.nativeElement.focus();
        });
    }

    private commitOther() {
        if (this._otherValueText != '') {
            this.values = this.values.push(this._otherValueText);
            this.selectedValuesChange.emit(
                this.selectedValues.add(this._otherValueText)
            );
        }
        this._otherValueText = null;
    }


}


