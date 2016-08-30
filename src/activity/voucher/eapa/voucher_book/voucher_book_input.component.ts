import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef, ElementRef
} from '@angular/core';
import {NgModel} from '@angular/forms';

import {isBlank} from 'caesium-core/lang';

import {EAPAVoucherBook, isValidVoucherId} from './voucher_book.model';
import {VoucherBookAdjacency} from './adjacency.model';

@Component({
    selector: 'eapa-voucher-book-input',
    template: `
    <style>
    :host {
        display: block; 
    }
    .form-control.ng-pristine {
        color: #0f0f0f;
    }
    
    .adjacency-container {
        position: relative;
        overflow: hidden;
        transform: translateY(-7px);
    }
        
    .adjacency-next::before, 
    .adjacency-prev::before,
    .adjacency-both::before {
        content: '';
        position: absolute; 
        height: 100%;
        width: 100%;
        
        left: 80%;
    
        background-color: blue;
    }
    
    .adjacency-next::before,
    .adjacency-prev::before {
        border-radius: 4px;
    }
    
    .adjacency-next::before {
        top: 50%; 
        bottom: -50%;
    }
    
    .adjacency-prev::before {
        top: -50%;
        height: 100%;
        width: 100%;
    }
    .adjacency-both::before {
        top: -50%;
        height: 200%; 
    }
    
    </style>
    <div class="row">
        <div class="col-sm-1" [ngSwitch]="adjacency" 
            class="adjacency-container col-sm-1"
            [style.height]="_hostHeight">
            <div *ngSwitchCase="'PREV'" class="adjacency adjacency-prev"></div>
            <div *ngSwitchCase="'NEXT'" class="adjacency adjacency-next"></div>
            <div *ngSwitchCase="'BOTH'" class="adjacency adjacency-both"></div>
        </div>
        <div class="form-group col-sm-4" [ngClass]="{
            'has-error': !isFirstIdValid
        }">
            <label class="control-label" for="voucher-start" class="sr-only">
                First voucher in current booklet
            </label>
            <input type="text" 
                class="form-control"
                [required]="true"
                pattern="\\d{6}"
                [ngModel]="voucherBook.firstId"
                (ngModelChange)="firstIdChanged($event)"
                #firstIdInput="ngModel"
                (focus)="firstIdFocused($event)"
                (blur)="firstIdBlurred($event)">
            <!--
            <div *ngIf="!voucherBook.isValidFirstId"
                class="help-block has-error">
                Voucher ID is a 6-digit ID printed on the front of the physical voucher.
            </div>
            -->
        </div>    
        <div class="col-sm-3">
            <p class="form-control-static">{{voucherBook.numIssued}}</p>       
        </div>
        
        <div class="form-group col-sm-4 has-error"
            *ngIf="!isFirstIdValid">
        
            <div class="help-block"> 
                ID must be a six digit value 
            </div>
        </div>
    </div>
    `,
    directives: [],
    styleUrls: [
        '../../../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAVoucherBookInput {
    @Input() voucherBook: EAPAVoucherBook;
    @Output() voucherBookChange = new EventEmitter<EAPAVoucherBook>();

    @Input() adjacency: VoucherBookAdjacency;

    // Stored firstIdInput value
    private _firstIdInput: number;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        this._firstIdInput = this.voucherBook.firstId;
    }

    private get _hostHeight(): string{
        var elem: HTMLElement = this.elementRef.nativeElement;
        return `${elem.clientHeight}px`;
    }

    propChanged(prop: string, value: any) {
       this.voucherBookChange.emit(
            this.voucherBook.set(prop, value)
        );
    }

    firstIdChanged(value: string) {
        this._firstIdInput = Number.parseInt(value);
        if (this.isFirstIdValid) {
            this.propChanged('firstId', this._firstIdInput);
        }
    }

    get isFirstIdValid() {
        console.log('Is valid input', isValidVoucherId(this._firstIdInput));
        return isValidVoucherId(this._firstIdInput)
    }

    private firstIdFocused(event: Event) {
        let input = <HTMLInputElement>event.target;
        input.select();
    }

    private firstIdBlurred(event: Event) {
        event.preventDefault();
    }

    get bookMinRange(): number {
        return 1;
    }

    get bookMaxRange(): number {
        return this.voucherBook.maxIssuable;
    }

    markForCheck() {
        this.changeDetector.markForCheck();
    }
}
