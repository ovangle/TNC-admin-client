import {List} from 'immutable';

import {Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {OnActivate} from '@angular/router';

import {CarerManager} from '../carer/carer.manager';
import {Dependent} from './dependent.model';
import {DependentManager} from './dependent.manager';
import {Member} from '../member.model';
import {MemberDetailsPageService} from "../details_page.service";

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
export class DependentList implements OnActivate {

    private _memberDetailsPageService: MemberDetailsPageService;
    private _carerManager: CarerManager;
    private _dependentManager: DependentManager;

    private _changeDetector: ChangeDetectorRef;

    member: Member;
    dependents: List<Dependent>;


    constructor(
        carerManager: CarerManager,
        dependentManager: DependentManager,
        memberDetailsPageService: MemberDetailsPageService,
        changeDetector: ChangeDetectorRef
    ) {
        this._carerManager = carerManager;
        this._dependentManager = dependentManager;
        this._memberDetailsPageService = memberDetailsPageService;
        this._changeDetector = changeDetector;
        this.dependents = List<Dependent>();
    }

    routerOnActivate() {
        this._memberDetailsPageService.activePage = DependentList;
        this._memberDetailsPageService.getMember().then((member) => {
            return member.resolveCarer(this._carerManager).forEach((member) => {
                this.member = member;
            }).then((_) => {
                return this._carerManager.getDependents(this.member.carer).forEach((dependents) => {
                    this.dependents = dependents;
                });

            }).then((_) => {
                for (let d of this.dependents.toArray()) {
                    console.log('dependent: ', d.name);
                }
                this._changeDetector.markForCheck();
            })
        });
    }
}
