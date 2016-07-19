import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {SearchResult} from 'caesium-model/manager';

import {StaffMember} from '../../staff.model';
import {STAFF_TYPE_VALUES} from '../../type';
import {NamePipe} from "../../../../member/basic";

@Component({
    selector: 'staff-search-result-table-row',
    moduleId: module.id,
    templateUrl: './result_table_row.component.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [NamePipe],
    styleUrls: ['./result_table_row.component.css'],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffSearchResultTableRow {
    private staffTypeValues = STAFF_TYPE_VALUES;

    @Input() staffMember: StaffMember;
    @Input() colHeader: boolean = false;

    ngOnInit() {
        console.log('Staff member: ', this.staffMember);
    }


}
