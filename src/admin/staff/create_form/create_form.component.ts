import {Map} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {DateInput} from '../../../utils/date/date_input.component';
import {EnumSelect2} from '../../../utils/enum';

import {NameInput} from '../../../member/basic';

import {AbstractUser, UserInput} from '../../user';
import {StaffManager} from '../staff.manager';
import {STAFF_TYPE_VALUES} from '../type';

import {CreateStaffRequest, CreateStaffResponse, CreateStaffErrors} from './create_staff.model';



@Component({
    selector: 'staff-create-form',
    templateUrl: './create_form.component.html',
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('font-awesome/css/font-awesome.css'),
        require('css/flex.css'),
        require('./create_form.component.css')
    ],
    directives: [
        NameInput, DateInput, EnumSelect2, UserInput,
        ROUTER_DIRECTIVES
    ],
    providers: [StaffManager],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCreateForm {
    private staffTypeValues = STAFF_TYPE_VALUES;

    request: CreateStaffRequest;
    errors = Map<string,boolean>({
        name: false
    });

    @Output() createSuccess = new EventEmitter<CreateStaffResponse>();
    @Output() createCancel = new EventEmitter<any>();

    constructor(private staffManager: StaffManager,
                private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.request = new CreateStaffRequest();
        this.changeDetector.markForCheck();
    }

    get isValid() {
        return this.errors.valueSeq().every(v => v);
    }

    propChanged(prop: string, value: any) {
        this.request = <CreateStaffRequest>this.request.set(prop, value);
    }

    propValidityChange(prop: string, value: boolean) {
        this.errors.set(prop, value);
    }

    _userChanged(user: AbstractUser) {
        this.request = <CreateStaffRequest>user;
    }

    private save(): Promise<any> {
        return this.staffManager.post(this.request).forEach(response => {
            if (response instanceof CreateStaffResponse) {
                this.createSuccess.emit(response);
                return;
            } else {
                //this.errors = response;
            }
        });
    }
}
