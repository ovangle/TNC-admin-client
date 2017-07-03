
import {List, Record} from 'immutable';
import {recordCodec} from 'caesium-json/json_codecs';
import {isBlank, isNumber} from 'caesium-core/lang';
import {num} from 'caesium-json/json_codecs';
import {ArgumentError} from 'caesium-json/exceptions';

import {roundToFloor} from './utils';


export const VOUCHER_DOLLAR_VALUE = 50.0 /* AUD */;
export const VOUCHERS_PER_BOOK = 10;

const MIN_VOUCHER_ID = 100000;
const MAX_VOUCHER_ID = 999999;


const _EAPA_VOUCHER_BOOK_RECORD = Record({
    firstId: void 0,
    numIssued: 0
});

export class EAPAVoucherBook extends _EAPA_VOUCHER_BOOK_RECORD {

    firstId: number;
    numIssued: number;

    constructor(args?: {firstId?: number, numIssued?: number}) {
        super(args);
    }

    /**
     * The maximum voucher index
     * @returns {number}
     */
    get maxIssuable(): number {
        if (this.firstId === undefined) {
            return VOUCHERS_PER_BOOK;
        }
        let offset = this.firstId % VOUCHERS_PER_BOOK;
        return VOUCHERS_PER_BOOK - offset + 1;
    }

    set(prop: string, value: any): EAPAVoucherBook {
        return <EAPAVoucherBook>super.set(prop, value);
    }

    get isValid(): boolean {
        console.log('firstId', isValidVoucherId(this.firstId));
        console.log('numIssued', this.firstId + this.numIssued < nextBookId(this));
        return isValidVoucherId(this.firstId)
            && (this.firstId + this.numIssued < nextBookId(this));
    }

    contains(voucherId: number) {
        return this.firstId <= voucherId
            && voucherId < this.firstId + this.numIssued;
    }

    get lastId(): number {
        return this.firstId + this.numIssued - 1;
    }

    isAdjacentTo(voucherBook?: EAPAVoucherBook): boolean {
        if (isBlank(voucherBook))
            return false;

        return Math.abs(this.firstId - voucherBook.lastId) === 1
            || Math.abs(this.lastId - voucherBook.firstId) === 1;
    }
}

export const EAPA_VOUCHER_BOOK_CODEC = recordCodec<EAPAVoucherBook>({
    firstId: num,
    numIssued: num
}, (args: any) => new EAPAVoucherBook(args));

export function isValidVoucherId(id: number) {
    return isNumber(id)
        && MIN_VOUCHER_ID <= id
        && id <= MAX_VOUCHER_ID;
}

export function getTotalAllocation(voucherValue: number): number {
    if (voucherValue % VOUCHER_DOLLAR_VALUE !== 0)  {
        throw new ArgumentError(
            `Cannot get total allocation. ` +
            `Voucher value (${voucherValue}) must be a multiple of '${VOUCHER_DOLLAR_VALUE}'`
        );
    }

    return Math.floor(voucherValue / VOUCHER_DOLLAR_VALUE);

}

export function getCurrentAllocation(voucherBooks: List<EAPAVoucherBook>): number {
    return voucherBooks.reduce((acc, book) => acc + book.numIssued, 0);
}

function numBooksRequired(voucherBooks: List<EAPAVoucherBook>, totalAllocation: number): number {
    let allocation = getCurrentAllocation(voucherBooks);
    let diff = Math.ceil((totalAllocation - allocation) / VOUCHERS_PER_BOOK);
    return voucherBooks.count() + diff;
}

function bookIdAndOffset(voucherBook: EAPAVoucherBook): {bookId: number, offset: number} {
    if (isBlank(voucherBook.firstId)) {
        return undefined;
    }
    // Vouchers are 1-indexed
    let bookId = roundToFloor(voucherBook.firstId - 1, VOUCHERS_PER_BOOK) + 1;

    return {
        bookId: bookId,
        offset: voucherBook.firstId - bookId
    };
}

function nextBookId(voucherBook: EAPAVoucherBook) {
    let x = bookIdAndOffset(voucherBook);
    if (isBlank(x)) {
        return undefined;
    }
    return x.bookId + VOUCHERS_PER_BOOK;
}

function vouchersRemainingInBook(voucherBook: EAPAVoucherBook) {
    let x = bookIdAndOffset(voucherBook);
    if (isBlank(x)) {
        return 0;
    }
    return VOUCHERS_PER_BOOK - x.offset;
}


/**
 * Build a list of voucher books such that:
 *  - There is at least enough physical voucher books to issue vouchers equal to the assessment value.
 *  - The ID numbers of the voucher books increase by the voucher book size
 *
 *
 * @param voucherBooks
 * @param totalAllocation
 * @returns {List<EAPAVoucherBook>}
 */
export function prefillVoucherBooks(voucherBooks: List<EAPAVoucherBook>, totalAllocation: number): List<EAPAVoucherBook> {
    voucherBooks = voucherBooks
        .setSize(numBooksRequired(voucherBooks, totalAllocation))
        .map(book => isBlank(book) ? new EAPAVoucherBook(): book)
        .toList();

    if (voucherBooks.isEmpty() || !isValidVoucherId(voucherBooks.first().firstId)) {
        return voucherBooks;
    }

    voucherBooks = voucherBooks.withMutations(books => {
        let allocated = 0;

        let firstBook = books.first();
        let numIssued = Math.min(vouchersRemainingInBook(firstBook), totalAllocation);
        books = books.set(0, firstBook.set('numIssued', numIssued));

        for (let i = 1; i < books.count(); i++) {
            let prevBook = books.get(i - 1);
            allocated += prevBook.numIssued;
            let currBook = books.get(i);

            if (!isValidVoucherId(currBook.firstId) || (currBook.firstId < nextBookId(prevBook))) {
                currBook = currBook.set('firstId', nextBookId(prevBook));
            }
            let numIssued = Math.min(
                vouchersRemainingInBook(currBook),
                totalAllocation - allocated
            );
            currBook = currBook.set('numIssued', numIssued);
            books = books.set(i, currBook );
        }
        return books;
    });

    // Now that all the vouchers have been populated, discard any books
    // that we don't use a voucher from.
    return voucherBooks
        .filter(book => book.numIssued > 0)
        .toList();
}

export function isVoucherBooksValid(voucherBooks: List<EAPAVoucherBook>, voucherValue: number): boolean {
    if (voucherBooks.some(voucherBook => !voucherBook.isValid)) {
        return false;
    }

    let totalAllocation = getTotalAllocation(voucherValue);
    let currentAllocation = getCurrentAllocation(voucherBooks);

    return currentAllocation === totalAllocation;
}
