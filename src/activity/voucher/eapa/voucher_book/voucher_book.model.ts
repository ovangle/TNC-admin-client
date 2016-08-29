

import {List, Record} from 'immutable';
import {recordCodec} from 'caesium-model/json_codecs';
import {isBlank} from 'caesium-core/lang';
import {num} from 'caesium-model/json_codecs';

import {roundToCeil, roundToFloor} from './utils';


export const VOUCHER_DOLLAR_VALUE = 50.0 /* AUD */;
export const VOUCHERS_PER_BOOK = 10;


const _EAPA_VOUCHER_BOOK_RECORD = Record({
    firstId: void 0,
    numIssued: VOUCHERS_PER_BOOK
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

    get isFirstIdValid(): boolean {
        if (isBlank(this.firstId)) {
            return false;
        }
        return 100000 <= this.firstId && this.firstId <= 999999;
    }

    get isValid(): boolean {
        return this.isFirstIdValid
            && (0 < this.numIssued && this.numIssued <= 10)
    }

    contains(voucherId: number) {
        return this.firstId <= voucherId
            && voucherId < this.firstId + this.numIssued;
    }

    rangeOverlaps(other: EAPAVoucherBook): boolean {
        return other.contains(this.firstId)
            || this.contains(other.firstId);
    }

    get lastId(): number {
        return this.firstId + this.numIssued - 1;
    }

    get isFull(): boolean {
        return (this.firstId + this.numIssued) % VOUCHERS_PER_BOOK  === 0;
    }
}

export const EAPA_VOUCHER_BOOK_CODEC = recordCodec<EAPAVoucherBook>({
    firstId: num,
    numIssued: num
}, (args: any) => new EAPAVoucherBook(args));

export function numBooksRequired(voucherBooks: List<EAPAVoucherBook>, expectIssued: number): number {
    let actualIssued = voucherBooks.reduce((acc, book) => acc + book.numIssued, 0);
    return Math.ceil((expectIssued - actualIssued) / VOUCHERS_PER_BOOK);
}

function bookIdAndOffset(voucherBook: EAPAVoucherBook): {bookId: number, offset: number} {
    if (isBlank(voucherBook.firstId)) {
        return undefined;
    }
    return {
        bookId: roundToFloor(voucherBook.firstId, VOUCHERS_PER_BOOK) + 1,
        offset: voucherBook.firstId % VOUCHERS_PER_BOOK
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
    return (VOUCHERS_PER_BOOK + 1) - x.offset;
}


/**
 * Build a list of voucher books such that:
 *  - There is at least enough physical voucher books to issue vouchers equal to the assessment value.
 *  - The ID numbers of the voucher books increase by the voucher book size
 *
 *
 * @param voucherBooks
 * @param expectIssued
 * @returns {List<EAPAVoucherBook>}
 */
export function prefillVoucherBooks(voucherBooks: List<EAPAVoucherBook>, expectIssued: number): List<EAPAVoucherBook> {
    if (expectIssued === 0) {
        return voucherBooks;
    }
    let numBooks = numBooksRequired(voucherBooks, expectIssued);

    console.log('VOUCHER_BOOKS', voucherBooks.toJS());

    return voucherBooks.withMutations(books => {
        if (numBooks> 0) {
            let initialBooks = <EAPAVoucherBook[]>[];
            for (let i = 0; i < numBooks ; i++) {
                initialBooks.push(new EAPAVoucherBook());
            }
            books = books.push(...initialBooks);
        }

        if (books.isEmpty() || !books.first().isFirstIdValid) {
            return books;
        }

        let firstBook = books.first();
        let numIssued = Math.min(vouchersRemainingInBook(firstBook), expectIssued);
        books = books.set(0, firstBook.set('numIssued', numIssued));

        let allocated = 0;

        for (let i = 1; i < books.count(); i++) {
            let prevBook = books.get(i - 1);
            allocated += prevBook.numIssued;
            let currBook = books.get(i);

            console.log('PREVIOUS BOOK ID', nextBookId(prevBook));
            console.log('CURRENT BOOK ID', currBook.firstId);
            console.log('----------------------------------');

            if (!currBook.isFirstIdValid || (currBook.firstId < nextBookId(prevBook))) {
                currBook = currBook.set('firstId', nextBookId(prevBook));

            }
            let numIssued = Math.min(
                vouchersRemainingInBook(currBook),
                expectIssued - allocated
            );
            currBook = currBook.set('numIssued', numIssued);
            books = books.set(i, currBook );
        }
        return books;

    });
}
