import {Iterable} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';
import {DatePipe} from '@angular/common';

import {isBlank} from 'caesium-core/lang';

import {NamePipe, GENDER_VALUES} from '../basic';

import {Carer} from './carer.model';
import {Dependent} from './dependent.model';

import {CarerRel, CarerRelDisplay} from './carer_rel';


@Component({
    selector: 'dependent-display',
    template: `
    <h4>{{dependent.name | name}}</h4>
         
    <div class="row">
    <span class="display-label col-sm-4">Gender</span>
    <span class="display-value col-sm-8">{{gender}}</span>
    </div>
    
    <div class="row">
        <span class="display-label col-sm-4">Date of birth</span> 
        <span class="display-value col-sm-8">{{dependent.dateOfBirth | date}}</span>
    </div>
    
    <ul class="list-unstyled">
        <li *ngFor="let rel of carerRels">
            <carer-rel-display [rel]="rel"></carer-rel-display>
        </li> 
    </ul>
    
    
    `,
    directives: [CarerRelDisplay],
    pipes: [NamePipe, DatePipe],
    styles: [`
    :host {
        display: block;
        border: 1px solid black;
        border-radius: 5px;
    }
    
    h4 {
        margin-left: 1em;
    }    
    `],
    styleUrls: [
        'assets/css/bootstrap.css',
        'assets/css/details_display.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentDisplay {
    /// If this is non-blank, display the relationship to this carer only.
    @Input() carer: Carer;

    @Input() dependent: Dependent;

    get gender(): string {
        return GENDER_VALUES.get(this.dependent.gender);
    }

    get carerRels(): Iterable.Indexed<CarerRel> {
        if (!isBlank(this.carer)) {
            return this.dependent.carerRels
                .filter(rel => rel.carer.id === this.carer.id)
                .toIndexedSeq();
        }
        return this.dependent.carerRels;
    }

}
