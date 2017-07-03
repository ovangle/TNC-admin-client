import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChemistVoucherModule} from './chemist/chemist_voucher.module';
import {EAPAVoucherModule} from './eapa/eapa_voucher.module';
import {FoodcareVoucherModule} from './foodcare/foodcare_voucher.module';

@NgModule({
    imports: [
        CommonModule,
        ChemistVoucherModule,
        EAPAVoucherModule,
        FoodcareVoucherModule
    ],
    declarations: [

    ]
})
export class VoucherModule {}
