import {Set} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';

import {Search} from 'caesium-model/manager';

import {ResultContainer} from '../../../utils/search';

import {Partner} from '../partner.model';
import {PartnerManager} from '../partner.manager';


@Component({
    selector: 'partner-search',
    template: `
    <div class="table-body">
        <ul class="list-unstyled" [csSearch]="search" #result="result">
            <li *ngFor="let partner of result.items.toArray()" (click)="selectPartner(partner)">
                <!--{{partner.id}}: {{partner.name | name}}-->
            </li>
        </ul>
    </div>
    `,
    directives: [
        ResultContainer
    ],
    styleUrls: [
        'src/member/search/result_table/result_table.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnerSearch {
    @Input() paramValues: {id: string, name: Set<string>};

    private search: Search<Partner>;

    constructor(
        private partnerManager: PartnerManager,
        private _cd: ChangeDetectorRef
    ) {
        this.search = partnerManager.search();
    }

    ngOnChanges(changes: any) {
        if (changes.paramValues) {
            this.search.setParamValue('id', this.paramValues.id);
            this.search.setParamValue('name', this.paramValues.name);
            this._cd.markForCheck();
        }
    }
}
