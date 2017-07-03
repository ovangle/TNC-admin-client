import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';

import {
    Component, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {STAFF_TYPE_VALUES} from '../type';

import {StaffManager} from '../staff.manager';
import {StaffMember} from '../staff.model';


@Component({
    selector: 'staff-details',
    templateUrl: './staff_details.component.html',
    styleUrls: [
        './staff_details.component.css'
    ],
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
            .subscribe((staffMember: StaffMember) => {
                this.staffMember = staffMember;
                this.changeDetector.markForCheck();
            });
    }

    _isMainPageActive:boolean = true;

    propChanged(prop:string, value:any) {
        this.staffMember = <StaffMember>this.staffMember.set(prop, value);
    }
}

