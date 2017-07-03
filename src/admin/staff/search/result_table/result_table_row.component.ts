import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {StaffMember} from '../../staff.model';
import {STAFF_TYPE_VALUES} from '../../type';

@Component({
    selector: 'staff-search-result-table-row',
    templateUrl: './result_table_row.component.html',
    styleUrls: [
        './result_table_row.component.css'
    ],
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
