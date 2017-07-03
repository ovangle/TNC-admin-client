import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

import {OrElsePipe} from '../../../utils/pipes/or_else.pipe';

import {Member} from '../../member.model';
import {AddressPipe, NamePipe} from '../../basic';
import {AlertLabels} from "../../../utils/alert_label/alert_labels.component";
import {PhoneNumberPipe} from "../../../utils/pipes/phone_number.pipe";


@Component({
    selector: 'member-result-table-row',
    templateUrl: './result_table_row.component.html',
    styleUrls: [
        './result_table_row.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberSearchResultTableRow {
    @Input() colHeader: boolean = false;
    @Input() member: Member;
    @Input() isDropdown: boolean = true;
}
