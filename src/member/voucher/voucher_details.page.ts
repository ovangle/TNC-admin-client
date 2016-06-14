import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {OnActivate} from '@angular/router';
import {VoucherManager} from './voucher.manager';
import {MemberDetailsPageService} from "../details_page.service";

@Component({
    selector: 'voucher-details',
    template: `
    
    `,
    providers: [VoucherManager],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherDetails implements OnActivate {

    private _memberDetailsPageService: MemberDetailsPageService;
    private _voucherManager: VoucherManager;
    


    constructor(
        voucherManager: VoucherManager,
        memberDetailsPageService: MemberDetailsPageService
    ) {
        this._voucherManager = voucherManager;
        this._memberDetailsPageService = memberDetailsPageService;
    }

    routerOnActivate() {
        this._memberDetailsPageService.activePage = VoucherDetails;
    }
}
