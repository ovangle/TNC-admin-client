import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ViewContainerRef
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PageHeader} from '../../utils/layout/page_header.component';
import {Modal} from '../../utils/modal';
import {CreateStaffResponse} from './create_form/create_staff.model';
import {StaffCreateForm} from './create_form/create_form.component';
import {StaffCreateSuccessAlert} from './create_form/create_success_alert.component';



@Component({
    selector: 'staff-create-page',
    template: `
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
    directives: [PageHeader, StaffCreateForm, StaffCreateSuccessAlert],
    styles: [`
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
    `],
    styleUrls: [
        'assets/css/font-awesome.css',
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCreatePage {

    private createResponse: CreateStaffResponse;
    private modalClose = new EventEmitter<any>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modal: Modal,
        public vcRef: ViewContainerRef
    ) { }

    confirmCreate(response: CreateStaffResponse) {
        this.createResponse = response;
        this.modal.activate({
            body: StaffCreateSuccessAlert,
            bindings: {
                '(confirm)': '_navigateToStaffSearch()',
                '[createResponse]': 'createRespose'
            },
            remote: {
                view: this.vcRef,
                instance: this
            }
        }, this.modalClose);
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

