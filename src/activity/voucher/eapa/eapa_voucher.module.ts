import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {NameModule} from 'member/basic/name';
import {AddressModule} from 'member/basic/address';
import {EnergyAccountModule} from 'member/basic/energy_account';

import {VoucherManager} from '../voucher.manager';
import {VoucherAssessmentModule} from '../assessment/assessment.module';

import {EAPAVoucherAssessment} from './assessment/assessment.component';
import {EAPAVoucherAssessmentPage} from './assessment_page.component';
import {EAPAVoucherBillDisplay} from './bill/bill_display.component';
import {EAPAVoucherBillInput} from './bill/bill_input.component';
import {EAPAVoucherBookInput} from './voucher_book/voucher_book_input.component';
import {EAPAVoucherBooksInput} from './voucher_book/voucher_books_input.component';
import {EAPAVoucherEnergyAccountsSelect} from './voucher_accounts_select.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        NameModule,
        AddressModule,
        EnergyAccountModule,

        VoucherAssessmentModule
    ],
    providers: [
        VoucherManager
    ],
    declarations: [
        EAPAVoucherAssessment,
        EAPAVoucherAssessmentPage,
        EAPAVoucherBillDisplay,
        EAPAVoucherBillInput,

        EAPAVoucherBookInput,
        EAPAVoucherBooksInput,
        EAPAVoucherEnergyAccountsSelect
    ],
    entryComponents: [
        EAPAVoucherAssessmentPage
    ]
})
export class EAPAVoucherModule {}
