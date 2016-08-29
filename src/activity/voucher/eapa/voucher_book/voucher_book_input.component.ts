import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {NgModel} from '@angular/forms';

import {EAPAVoucherBook} from './voucher_book.model';

@Component({
    selector: 'eapa-voucher-book-input',
    template: `
    <style>
    :host {
        display: block; 
        padding: 0px 15px 0px 15px;
    }
    .form-control.ng-pristine {
        color: #0f0f0f;
    }
    
    
    </style>
    <div class="row">
        <div class="form-group col-sm-4" [ngClass]="{
            'has-error': !voucherBook.isValidFirstId
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
        <div class="col-sm-4">
            <p class="form-control-static">{{voucherBook.numIssued}}</p>       
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

    /// An error that is set, but which needs information about other booklets
    /// in order to set the error
    @Input() isOverlappingOtherVoucher: boolean = false;

    private _numIssuedDisabled = true;

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.voucherBook.isValid) {
            // Disable the numIssued selector
            this._numIssuedDisabled = this.voucherBook.isFull;
            this.changeDetector.markForCheck();
        }
    }

    propChanged(prop: string, value: any) {
       this.voucherBookChange.emit(
            this.voucherBook.set(prop, value)
        );
    }

    firstIdChanged(value: string) {
        let n = Number.parseInt(value);
        if (Number.isNaN(n)) {
            return;
        }
        if (n < 100000 || n > 999999) {
            return;
        }
        this.propChanged('firstId', n);
    }

    private firstIdFocused(event: Event) {
        console.log('firstIdFocused');
        let input = <HTMLInputElement>event.target;
        input.select();
    }

    private firstIdBlurred(event: Event) {
        console.log('firstIdBlurred');
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
