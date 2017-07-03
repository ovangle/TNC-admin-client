import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {DateModule} from 'utils/date';
import {InputsModule} from 'utils/inputs';
import {LayoutModule} from 'utils/layout';
import {PipesModule} from 'utils/pipes';
import {SpinnerModule} from 'utils/spinner';
import {SearchModule} from 'utils/search';
import {TimeModule} from 'utils/time';
import {AddressModule} from 'member/basic/address';
import {NameModule} from 'member/basic/name';
import {ContactModule} from 'member/basic/contact';

import {UserContext} from './user/context.service';
import {UserManager} from './user/user.manager';
import {UserLoginForm} from './user/login_form/login_form.component';
import {UserInput} from './user/user_input.component';
import {LoginPage} from './user/login_page.component';

import {UserGroupManager} from './user_group/user_group.manager';
import {UserGroupSelect} from './user_group/user_group_select.component';

import {StaffManager} from './staff/staff.manager';
import {StaffAvailabilityInput} from './staff/availability/availability_input.component';
import {StaffCreateForm} from './staff/create_form/create_form.component';
import {StaffCreateSuccessAlert} from './staff/create_form/create_success_alert.component';
import {StaffDetails} from './staff/details/staff_details.component';
import {StaffSearchResultTableRow} from './staff/search/result_table/result_table_row.component';
import {StaffSearchResultTable} from './staff/search/result_table.component';

import {StaffInductionSurveyManager} from './staff/induction_survey/induction_survey.manager';
import {StaffInductionSurveyInput} from './staff/induction_survey/induction_survey_input.component';
import {StaffSkillsInput} from './staff/induction_survey/skills/skills_input.component';
import {StaffTraitsInput} from './staff/induction_survey/traits/traits_input.component';

import {StaffCreatePage} from './staff/staff_create_page.component';
import {StaffSearchPage} from './staff/staff_search_page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        DateModule,
        InputsModule,
        TimeModule,
        LayoutModule,
        PipesModule,
        SearchModule,
        SpinnerModule,

        AddressModule,
        NameModule,
        ContactModule,
    ],
    declarations: [
        UserLoginForm,
        UserInput,
        LoginPage,

        UserGroupSelect,

        StaffAvailabilityInput,
        StaffCreateForm,
        StaffCreateSuccessAlert,
        StaffDetails,
        StaffInductionSurveyInput,
        StaffSkillsInput,
        StaffTraitsInput,
        StaffSearchResultTableRow,
        StaffSearchResultTable,
        StaffCreatePage,
        StaffSearchPage
    ],
    providers: [
        UserManager,
        UserContext,
        UserGroupManager,
        StaffManager,
        StaffInductionSurveyManager
    ]
})
export class AdminModule {}
