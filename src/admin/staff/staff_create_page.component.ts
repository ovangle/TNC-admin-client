import {
    Component, EventEmitter, ChangeDetectionStrategy, Injector
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Modal} from 'utils/modal';
import {CreateStaffResponse} from './create_form/create_staff.model';
import {StaffCreateSuccessAlert} from './create_form/create_success_alert.component';

@Component({
    selector: 'staff-create-page',
    template: `
    <style>
    :host {
        display: block;
        height: 100%;
    }
    .container {
        height: 100%;
    } 
    staff-create-form {
        height: calc(100% - 140px);
    }   
    </style>
    <div class="container">
        <page-header title="Create staff">
            <div class="btn-group">
                <button class="close"
                        (click)="cancelCreate()"><i class="fa fa-close"></i></button> 
            </div> 
        </page-header>
        <staff-create-form
            (createSuccess)="confirmCreate($event)"
            (createCancel)="cancelCreate()">
        </staff-create-form>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCreatePage {

    private createResponse: CreateStaffResponse;
    private modalClose = new EventEmitter<any>();

    constructor(
        private injector: Injector,
        private router: Router,
        private route: ActivatedRoute,
        private modal: Modal
    ) { }

    confirmCreate(response: CreateStaffResponse) {
        this.createResponse = response;
        this.modal.open(
            StaffCreateSuccessAlert,
            this.injector,
            {
                createResponse: response,
                confirm: (_: any) => this._navigateToStaffSearch()
            }
        );
    }

    cancelCreate() {
        this._navigateToStaffSearch();
    }

    private _navigateToStaffSearch() {
        this.router.navigate(['..'], {relativeTo: this.route}).then((_) => {
            this.modalClose.emit(true);
        });
    }


}

