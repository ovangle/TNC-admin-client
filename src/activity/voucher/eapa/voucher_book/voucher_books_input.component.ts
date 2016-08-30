import {List, Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ViewChildren, QueryList,
    ChangeDetectorRef
} from '@angular/core';

import {EAPAVoucherBook, prefillVoucherBooks, VOUCHER_DOLLAR_VALUE} from './voucher_book.model';
import {EAPAVoucherBookInput} from './voucher_book_input.component';
import {VoucherBookAdjacency, getAdjacencies} from './adjacency.model';


@Component({
    selector: 'eapa-voucher-books-input',
    template: `
    <style>
    eapa-voucher-book-input {
        min-width: 25%;
    } 
    </style>
    
    
    <div class="form-horizontal" *ngIf="!_prefilled.isEmpty()"> 
        <p>
        Enter the value of the first 6-digit voucher IDs printed on the front of the voucher booklet.
        If the voucher is already partially consumed, insert the ID of 
        the first visible voucher.
        </p> 
        
        <p><em>Note:</em> Vouchers must be input in ascending order, with the smallest ID first</p>
        
        <div class="row">
            <div class="col-sm-1"></div> 
            <div class="col-sm-4">
                <p class="col-header"><strong>First ID</strong></p>
            </div> 
            <div class="col-sm-4">
                <p><strong>Consumed</strong></p>
            </div>
            <div class="col-sm-4">
            </div>
        </div>
        <eapa-voucher-book-input
                class="flex"
                *ngFor="let voucherBook of _prefilled; let i = index"
                [adjacency]="_adjacencies.get(i)"   
                [voucherBook]="voucherBook"
                (voucherBookChange)="bookChanged(i, $event)">
        </eapa-voucher-book-input>
        <div class="form-group">
            <div class="col-sm-1"
            <label class="control-label col-sm-4">Allocated</label>
            <p class="form-control-static col-sm-4">{{currentAllocation}}</p>
        </div>
        
        <div class="form-group">
            <div class="col-sm-1"></div>
            <label for="allocate-vouchers" class="control-label col-sm-4">Required</label>
            <p class="form-control-static col-sm-4">{{totalAllocation}}</p>
        </div>
    </div>
    
    <div *ngIf="_prefilled.isEmpty()" class="alert alert-danger">
        No vouchers required by assessment
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
    @Input() voucherValue: number;

    get totalAllocation(): number {
        return Math.floor(this.voucherValue / VOUCHER_DOLLAR_VALUE);
    }

    get currentAllocation(): number {
        return this.voucherBooks
            .reduce((acc, book) => acc + book.numIssued, 0)
    }

    /// A prefilled copy of the array. This is the vouchers we actually
    /// want to keep.
    private _prefilled = List<EAPAVoucherBook>();
    private _adjacencies = List<VoucherBookAdjacency>();

    /// Which IDs have been directly edited by the user (i.e. not pre-filled values)?
    private _editedBooks: Set<number>;

    constructor(private _cd: ChangeDetectorRef){
        this._editedBooks = Set<number>();
    }

    ngOnChanges(changes: any) {
        this._prefilled = prefillVoucherBooks(this.voucherBooks, this.totalAllocation);
        this._adjacencies = getAdjacencies(this._prefilled);
        this._cd.markForCheck();
    }

    private _focusedInput: number;

    private errors: {
        isOverlapping: {[index: number]: boolean}
    };

    get actualIssued(): number {
        return this.voucherBooks.reduce((acc, book) => book.numIssued, 0);
    }

    bookChanged(index: number, event: EAPAVoucherBook) {
        this._editedBooks = this._editedBooks.add(index);
        let voucherBooks = prefillVoucherBooks(
            this.voucherBooks.set(index, event),
            this.totalAllocation
        );

        this.voucherBooksChange.emit(voucherBooks);
    }
}
