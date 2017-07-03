import {
    Component, ChangeDetectionStrategy, ViewChild, Injector
} from '@angular/core';

import {DropdownMenu} from 'utils/layout/dropdown_menu.component';
import {Modal} from 'utils/modal';

import {ChemistVoucherAssessmentPage} from 'activity/voucher/chemist';
import {EAPAVoucherAssessmentPage} from 'activity/voucher/eapa';
import {FoodcareVoucherAssessmentPage} from 'activity/voucher/foodcare';

import {Member} from './member.model';

@Component({
    selector: 'contact-menu-dropdown',
    template: `
    <dropdown-menu #contactMenu>
        <dropdown-menu-item 
            (click)="issueVoucher('foodcare')">
            Issue Foodcare voucher
        </dropdown-menu-item>
        <dropdown-menu-item>
            <a (click)="issueVoucher('chemist')">Issue Chemist voucher</a>
        </dropdown-menu-item>
        <dropdown-menu-item 
            [link]="['activity/voucher/eapa']">
            Issue EAPA voucher
        </dropdown-menu-item>
    </dropdown-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberContactMenuDropdown {
    @ViewChild('contactMenu') contactMenu: DropdownMenu;

    constructor(
        private injector: Injector,
        private modal: Modal
    ) {}

    issueVoucher(voucherType: string) {
        switch (voucherType) {
            case 'chemist':
                this.modal.open(ChemistVoucherAssessmentPage, this.injector);
                break;
            case 'eapa':
                this.modal.open(EAPAVoucherAssessmentPage, this.injector);
                break;
            case 'foodcare':
                this.modal.open(FoodcareVoucherAssessmentPage, this.injector);
                break;
            default:
                throw `Unrecognised voucher type '${voucherType}'`;
        }
        this.contactMenu.close();
    }

    toggle() {
        this.contactMenu.toggle();
    }



}
