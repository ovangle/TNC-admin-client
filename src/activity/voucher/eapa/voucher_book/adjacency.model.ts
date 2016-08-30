import {List, Seq} from 'immutable';
import {EAPAVoucherBook} from './voucher_book.model';

export type VoucherBookAdjacency =
    'NONE'
    | 'NEXT'
    | 'PREV'
    | 'BOTH';

function getAdjacency(curr: EAPAVoucherBook, prev?: EAPAVoucherBook, next?: EAPAVoucherBook): VoucherBookAdjacency {

    let prevAdjacent = curr.isAdjacentTo(prev);
    console.log(`prev: ${prev ? prev.lastId : 'none'} -> ${curr.firstId}\t${prevAdjacent}`);
    let nextAdjacent = curr.isAdjacentTo(next);
    console.log(`next: ${curr.lastId} -> ${next ? next.firstId: 'none'}\t${nextAdjacent}`);

    if (prevAdjacent) {
        return nextAdjacent ? 'BOTH' : 'PREV';
    }

    if (nextAdjacent) {
        return prevAdjacent ? 'BOTH' : 'NEXT';
    }

    return 'NONE';
}

export function getAdjacencies(voucherBooks: List<EAPAVoucherBook>): List<VoucherBookAdjacency> {

    let prevIds = voucherBooks.insert(0, undefined);
    let nextIds = voucherBooks.push(undefined).skip(1);

    return voucherBooks.zipWith(
        (curr, prev, next) => getAdjacency(curr, prev, next),
        voucherBooks.insert(0, undefined),
        voucherBooks.push(undefined).skip(1)
    ).toList();
}


