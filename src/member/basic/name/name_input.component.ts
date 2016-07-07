import {Map} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy,
    ViewChild
} from '@angular/core';
import {FormControl, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

import {isDefined} from 'caesium-core/lang';

import {Name} from './name.model';


@Component({
    selector: 'name-input',
    template: `
    <div class="layout horizontal">
        <div class="form-group flex"
            [ngClass]="{
                'has-error': firstName.dirty && !firstName.valid
            }">
                                 
            <label class="control-label" for="first-name">First name</label>
            <input id="first-name" type="text" class="form-control"
                [disabled]="disabled"
                [ngModel]="name.firstName"
                (ngModelChange)="propChanged('firstName', $event)"
                required
                #firstName="ngModel">
            <span class="help-block"
                *ngIf="firstName.dirty && firstName.errors?.required">
               A value is required
            </span>
        </div>
                
        <div class="form-group flex"
             [ngClass]="{
                'has-error': lastName.dirty && !lastName.valid
             }">
            <label class="control-label" for="last-name">Last name</label>
            <input id="last-name" type="text" class="form-control col-sm-5"
                [disabled]="disabled"
                [ngModel]="name.lastName"
                (ngModelChange)="propChanged('lastName', $event)"
                required
                #lastName="ngModel">
            <span class="help-block"      
                *ngIf="lastName.dirty && lastName.errors?.required">
                A value is required     
            </span>
        </div>       
    </div>    
    `,
    directives: [REACTIVE_FORM_DIRECTIVES],
    styles: [`
    .form-group + .form-group {
        margin-left: 30px;
    }    
    
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameInput {
    @Input() name: Name;
    @Output() nameChange = new EventEmitter<Name>();
    @Output() validityChange = new EventEmitter<boolean>();

    /**
     * Not all names have an alias.
     */
    @Input() aliasHidden: boolean = false;

    @Input() disabled: boolean;

    @ViewChild('firstName') firstNameControl: FormControl;
    @ViewChild('lastName') lastNameControl: FormControl;

    get isValid(): boolean {
        return (!isDefined(this.firstNameControl) || this.firstNameControl.valid)
            && (!isDefined(this.lastNameControl) || this.lastNameControl.valid);
    }

    propChanged(prop: string, value: string) {
        this.nameChange.emit(<Name>this.name.set(prop, value));
        if (this.firstNameControl && this.lastNameControl) {
            this.validityChange.emit(this.isValid);
        }

    }

}

