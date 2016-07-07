import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';

import {Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CarerManager} from '../carer/carer.manager';
import {Dependent} from './dependent.model';
import {DependentManager} from './dependent.manager';
import {Member} from '../member.model';
import {MemberContext} from "../details_context.service";

import {DependentListItem} from './dependent_list_item.component';

@Component({
    selector: 'dependent-list',
    template: `
        <ul class="list-unstyled">
            <li *ngFor="let dependent of dependents.toArray()">
                <dependent-list-item [dependent]="dependent"></dependent-list-item>
            </li>
        </ul>
    `,
    directives: [DependentListItem],
    providers: [CarerManager, DependentManager],
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentList {

    member: Member;
    dependents: List<Dependent>;

    private routeChange: Subscription;
    private memberChange : Subscription;

    constructor(
        private carerManager: CarerManager,
        private dependentManager: DependentManager,
        private context: MemberContext,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {
        this.dependents = List<Dependent>();
    }

    ngOnInit() {
        this.context.activePage = DependentList;
        this.memberChange = this.context.memberChange
            .switchMap(member => {
                this.member = member;
                return this.carerManager.getDependents(member.carer);
            })
            .subscribe(dependents => {
                this.dependents = dependents;
            });
    }

    ngOnDestroy() {
        if (!this.memberChange.isUnsubscribed) {
            this.memberChange.unsubscribe();
        }
    }

}
