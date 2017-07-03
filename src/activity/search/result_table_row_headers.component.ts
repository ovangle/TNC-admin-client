import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector:'activity-result-table-row-headers',
    template: `
    <span class="table-cell col-header date-col">Date</span>
    <span class="table-cell col-header type-col">Type</span>
    <span class="table-cell col-header assessor-col">Assessor</span>
    <span class="table-cell col-header value-col">Value</span>
    `,
    styleUrls: [
        './result_table_columns.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitySearchResultTableRowHeaders {}

