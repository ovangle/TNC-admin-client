import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {DateModule} from 'utils/date';
import {InputsModule} from 'utils/inputs';
import {LayoutModule} from 'utils/layout';
import {PipesModule} from 'utils/pipes';
import {SearchModule} from 'utils/search';
import {SpinnerModule} from 'utils/spinner';
import {AlertLabelModule} from 'utils/alert_label';

import {AddressModule} from './basic/address';
import {NameModule} from './basic/name';
import {ContactModule} from './basic/contact';
import {IncomeModule} from './basic/income';
import {ResidentialStatusModule} from './basic/residential_status';
import {EnergyAccountModule} from './basic/energy_account';

import {MemberTermModule} from './term';
import {MemberDependentModule} from './dependents';
import {MemberFileNoteModule} from './file_notes';

import {MemberManager} from './member.manager';

import {MemberContactMenuDropdown} from './contact_menu.component';
import {MemberDetailsPage} from './details_page.component';
import {MemberSearchPage} from './search_page.component';
import {MemberRenewalPage} from './renewal_page.component';
import {MemberSignupPage} from './signup_page.component';
import {MemberCard} from './member_card.component';
import {MemberSelect} from './member_select.component';

import {MemberDetailsNav} from './details/details_nav.component';
import {MemberBasicDetails} from './details/basic_details.component';
import {MemberFileNotes} from './details/file_notes.component';
import {MemberActivity} from './details/activity.component';

import {MemberInputForm} from './member_input/member_input.component';
import {MemberSignupSuccess} from './signup/signup_success_alert.component';

import {PartnerCreate} from './partner/partner_create.component';
import {PartnerDisplay} from './partner/partner_display.component';
import {PartnerInput} from './partner/partner_input.component';

import {MemberSearchResultTable} from './search/result_table.component';
import {MemberSearchResultTableRow} from './search/result_table/result_table_row.component';
import {MemberSearchResultDropdown} from './search/search_result_dropdown.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        AlertLabelModule,
        DateModule,
        InputsModule,
        LayoutModule,
        PipesModule,
        SearchModule,
        SpinnerModule,

        AddressModule,
        NameModule,

        ContactModule,
        ResidentialStatusModule,
        IncomeModule,
        EnergyAccountModule,
        MemberTermModule,

        MemberDependentModule,

        MemberFileNoteModule
    ],
    providers: [
        MemberManager,
    ],
    declarations: [
        MemberDetailsPage,
        MemberSearchPage,
        MemberRenewalPage,
        MemberSignupPage,

        MemberContactMenuDropdown,
        MemberCard,
        MemberSelect,

        MemberDetailsNav,
        MemberFileNotes,
        MemberBasicDetails,
        MemberActivity,

        MemberInputForm,
        MemberSignupSuccess,

        MemberSearchResultTable,
        MemberSearchResultTableRow,
        MemberSearchResultDropdown,


        PartnerCreate,
        PartnerDisplay,
        PartnerInput,
    ],
    entryComponents: [
        MemberSignupSuccess
    ]
})
export class MemberModule {}
