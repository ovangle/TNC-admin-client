import {List, Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ViewChildren, QueryList,
    ChangeDetectorRef
} from '@angular/core';

import {EAPAVoucherBook, prefillVoucherBooks, numBooksRequired} from './voucher_book.model';
import {EAPAVoucherBookInput} from './voucher_book_input.component';


@Component({
    selector: 'eapa-voucher-books-input',
    template: `
    <style>
    eapa-voucher-book-input {
        min-width: 25%;
    } 
    </style>
    <p>Details of the physical EAPA voucher</p>
    
    <div class="form-group">
        <label for="allocate-vouchers">Number of vouchers to allocate</label>
        <p class="form-control-static">{{expectIssued}}</p>
    </div>
    
    <!--
    <div class="form-group">
        <label for="num-booklets-required">Number of booklets required</label>
        <p class="form-control-static">{{numBookletsRequired}}</p>
    </div>
    -->
    
    <div> 
        <p>
        Enter the value of the first voucher IDs in each booklet used. 
        If the voucher is already partially consumed, insert the ID of 
        the first visible voucher.
        </p> 
        
        <div class="row">
            <div class="col-sm-4">
                <p class="col-header"><b>First ID</b></p>
            </div> 
            <div class="col-sm-4">
                <p><b>Consumed</b></p>
            </div>
            
        </div>
        <div class="layout">
            <eapa-voucher-book-input
                class="flex"
                *ngFor="let voucherBook of _prefilled; let i = index"
                [edited]="_editedBooks.contains(i)"
                [voucherBook]="voucherBook"
                (voucherBookChange)="bookChanged(i, $event)">
            </eapa-voucher-book-input>
        </div>
    </div>
    `,
    directives: [EAPAVoucherBookInput],
    styleUrls: [
        '../../../../../assets/css/bootstrap.css',
        '../../../../../assets/css/flex.css',
        '../../../../../assets/css/search_result_table.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EAPAVoucherBooksInput {
    @Input() voucherBooks: List<EAPAVoucherBook>;
    @Output() voucherBooksChange = new EventEmitter<List<EAPAVoucherBook>>();

    /// The number of individual vouchers we are required to issue.
    @Input() expectIssued: number;

    /// A prefilled copy of the array. This is the vouchers we actually
    /// want to keep.
    private _prefilled: List<EAPAVoucherBook>;

    /// Which IDs have been directly edited by the user (i.e. not pre-filled values)?
    private _editedBooks: Set<number>;

    constructor(private _cd: ChangeDetectorRef){
        this.errors = {
            isOverlapping: []
        }
        this._editedBooks = Set<number>();
    }

    ngOnChanges(changes: any) {
        if (changes.voucherBooks) {
            this._prefilled = prefillVoucherBooks(changes.voucherBooks.currentValue, this.expectIssued);
            this._cd.markForCheck();
        }
    }

    get prefilledVoucherBooks(): List<EAPAVoucherBook> {
        return prefillVoucherBooks(this.voucherBooks, this.expectIssued);
    }

    get numBookletsRequired(): number {
        return numBooksRequired(this.voucherBooks, this.expectIssued);
    }

    private _focusedInput: number;

    private errors: {
        isOverlapping: {[index: number]: boolean}
    };

    get actualIssued(): number {
        return this.voucherBooks.reduce((acc, book) => book.numIssued, 0);
    }

    isSomeBookOverlapping(index: number, book: EAPAVoucherBook) {
        return this.voucherBooks
            .valueSeq()
            .filter((book, i) => i !== index)
            .some(b => book.rangeOverlaps(b));
    }

    bookChanged(index: number, event: EAPAVoucherBook) {
        this._editedBooks = this._editedBooks.add(index);

        if (this.isSomeBookOverlapping(index, event)) {
            this.errors.isOverlapping[index] = true;
        }

        this.voucherBooksChange.emit(this._prefilled.set(index, event));
    }
}
