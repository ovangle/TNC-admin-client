import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {OnActivate} from '@angular/router';
import {DependentManager} from './dependent.manager';
import {MemberDetailsPageService} from "../details_page.service";

@Component({
    selector: 'dependent-details',
    template: `
    
    `,
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentDetails implements OnActivate {

    private _memberDetailsPageService: MemberDetailsPageService;
    private _dependentManager: DependentManager;


    constructor(
        dependentManager: DependentManager,
        memberDetailsPageService: MemberDetailsPageService
    ) {
        this._dependentManager = dependentManager;
        this._memberDetailsPageService = memberDetailsPageService;
    }

    routerOnActivate() {
        this._memberDetailsPageService.activePage = DependentDetails;
    }
}
