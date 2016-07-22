import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import {Expander} from "../../../utils/layout/expander.component";
import {DefaultPipe} from '../../../utils/pipes/default.pipe';

import {Member} from '../../member.model';
import {AddressPipe, NamePipe} from '../../basic';
import {AlertLabels} from "../../../utils/alert_labels.component";
import {PhoneNumberPipe} from "../../../utils/pipes/phone_number.pipe";

@Component({
    selector: 'member-result-table-row',
    moduleId: module.id,
    templateUrl: './result_table_row.component.html',
    styleUrls: ['./result_table_row.component.css'],
    directives: [Expander, AlertLabels, ROUTER_DIRECTIVES],
    pipes: [AddressPipe, DefaultPipe, NamePipe, PhoneNumberPipe],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberResultTableRow {
    @Input() colHeader: boolean = false;
    @Input() member: Member;
    @Input() isDropdown: boolean = true;
}
