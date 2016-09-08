import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    ChangeDetectorRef
} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {DateInput} from '../../../utils/date/date_input.component';
import {PageHeader} from '../../../utils/layout/page_header.component';

import {AddressInput, ContactInput, NamePipe} from '../../../member/basic';

import {STAFF_TYPE_VALUES} from '../type';
import {StaffAvailabilityInput} from '../availability';
import {StaffInductionSurveyInput} from '../induction_survey';

import {StaffManager} from '../staff.manager';
import {StaffMember} from '../staff.model';


@Component({
    selector: 'staff-details',
    moduleId: module.id,
    templateUrl: './staff_details.component.html',
    styles: [
        require('bootstrap/dist/css/bootstrap.css'),
        require('font-awesome/css/font-awesome.css'),
        require('./staff_details.component.css')
    ],
    directives: [
        AddressInput, ContactInput, DateInput,
        StaffAvailabilityInput, StaffInductionSurveyInput,
        PageHeader,
        ROUTER_DIRECTIVES
    ],
    pipes: [NamePipe],
    providers: [StaffManager],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffDetails {
    private staffTypeValues = STAFF_TYPE_VALUES;

    private _routeSubscription:Subscription;

    staffMember:StaffMember;

    constructor(private staffManager:StaffManager,
                private route:ActivatedRoute,
                private changeDetector:ChangeDetectorRef) {
    }

    ngOnInit() {
        this._routeSubscription = this.route.params
            .map(params => Number.parseInt(params['id']))
            .switchMap(id => this.staffManager.getById(id).handle({
                select: 200,
                decoder: this.staffManager.modelCodec
            }))
            .subscribe(staffMember => {
                this.staffMember = staffMember;
                this.changeDetector.markForCheck();
            });
    }

    _isMainPageActive:boolean = true;

    propChanged(prop:string, value:any) {
        this.staffMember = <StaffMember>this.staffMember.set(prop, value);
    }
}

