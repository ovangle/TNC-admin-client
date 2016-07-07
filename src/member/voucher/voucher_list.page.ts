import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';

import {List} from 'immutable';

import {
    Component, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Member} from '../member.model';

import {MemberContext} from "../details_context.service";

import {Voucher} from './voucher.model';
import {VoucherManager} from './voucher.manager';
import {VoucherListItem} from './voucher_list_item.component';

@Component({
    selector: 'voucher-details',
    template: `
    <ul class="list-unstyled">
        <li *ngFor="let voucher of vouchers?.toArray(); #i=index">
            <voucher-list-item 
                [voucher]="voucher"
                (voucherChange)="_handleVoucherChange($event, i)"></voucher-list-item>    
        </li>
    </ul>
    `,
    directives: [VoucherListItem],
    providers: [VoucherManager],
    styles: [`
    li {
        margin-bottom: 0.2rem;
    }
    
    `],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherList {
    member: Member;
    vouchers: List<Voucher>;

    private memberChange: Subscription;

    constructor(
        private context: MemberContext,
        private voucherManager: VoucherManager,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.context.activePage = VoucherList;
        this.memberChange = this.context.memberChange
            .switchMap(member => {
                this.member = member;
                return this.voucherManager.getVouchersForMember(member)
            })
            .subscribe((vouchers) => {
                this.vouchers = vouchers;
                this.changeDetector.markForCheck();
            });
    }

   ngOnDestroy() {
       if (!this.memberChange.isUnsubscribed) {
           this.memberChange.unsubscribe();
       }
   }

    _handleVoucherChanged(voucher: Voucher, index: number) {
        this.vouchers = this.vouchers.set(index, voucher);
    }
}
