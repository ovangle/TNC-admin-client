import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    Optional
} from '@angular/core';

import {ROUTER_DIRECTIVES} from '@angular/router';

import {isBlank} from 'caesium-core/lang';
import {Search} from 'caesium-model/manager';

import {SearchBar, ParameterBuilder} from '../../utils/search';
import {DropdownMenu} from '../../utils/layout/dropdown_menu.component';
import {Member, MemberDetailsPage} from '../../member';

import {Task} from './task.model';
import {TaskManager} from './task.manager';

import {TaskSearchResultTable} from './search/result_table.component';
import {TaskParameterBuilder} from './search/parameter_builder.service';

import {TASK_MENU_ITEMS} from './task.menuitems';

@Component({
    selector: 'task-search-page',
    template: `
     <div class="search-bar-container layout horizontal">
        <search-bar 
            (paramValuesChange)="paramValuesChanged($event)">
        </search-bar>    
        <div>
            <button class="btn btn-default" (click)="_menuActive = true">
                <i class="fa fa-plus"></i> New <i class="caret"></i>
            </button>
            <dropdown-menu 
                [active]="_menuActive"
                [items]="taskMenuItems"> 
            </dropdown-menu>
        </div>
    </div>
    <task-search-result-table class="search-results" [search]="search">
    </task-search-result-table>
    `,
    directives: [SearchBar, ROUTER_DIRECTIVES, TaskSearchResultTable, DropdownMenu],
    providers: [
        {provide: ParameterBuilder, useClass: TaskParameterBuilder},
        TaskManager
    ],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/font-awesome.css',
        'assets/css/flex.css',
        'assets/css/search_page.css'
    ],
    encapsulation: ViewEncapsulation.Native
})
export class TaskSearchPage {
    private taskMenuItems = TASK_MENU_ITEMS;

    private member: Member;
    private search: Search<Task>;

    private _menuActive: boolean = true;

    get isAnonymous(): boolean {
        return isBlank(this.member);
    }

    constructor(
        private taskManager: TaskManager,
        @Optional() private memberDetailsPage: MemberDetailsPage
    ) { }

    ngOnInit() {
        this.search = this.taskManager.search();

        if (!this.isAnonymous) {
            this.memberDetailsPage.member.forEach(member => {
                this.member = member;
                this.search.setParamValue('member', member.id);
                this.search.reset();
            });
        }
    }

    expandMenu() {
        this._menuActive = true;
    }

}
