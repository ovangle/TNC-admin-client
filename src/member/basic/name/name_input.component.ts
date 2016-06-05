import {
    Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

import {Name} from './name.model';


@Component({
    selector: 'name-input',
    template: `
    <fieldset>
        <legend>{{label}}</legend>

        <div class="form-group">
            <label for="fist-name">First name</label>
            <input type="text" class="form-control"
                   [disabled]="disabled"
                   [ngModel]="name.firstName"
                   (ngModelChange)="_firstNameChange($event)">
        </div>
        
           
        <div class="form-group">
            <label for="alias-input">Preferred first name</label>
            <input type="text" class="form-control"
                   [disabled]="disabled" 
                   [ngModel]="name.alias"
                   (ngModelChange)="_aliasChanged($event)">
        </div>
            
        <div class="form-group">
            <label for="last-name">Last name</label>
            <input type="text" class="form-control"
                   [disabled]="disabled"
                   [ngModel]="name.lastName"
                   (ngModelChange)="_lastNameChange($event)">
        </div>
    </fieldset>
    `,
    styleUrls: [
        'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameInput {
    @Input() name: Name;
    @Output() nameChange = new EventEmitter<Name>();

    @Input() label: string;
    @Input() disabled: boolean;

    _firstNameChanged(firstName: string) {
        this.nameChange.emit(
            <Name>this.name.set('firstName', firstName)
        );
    }

    _lastNameChanged(lastName: string) {
        this.nameChange.emit(
            <Name>this.name.set('lastName', lastName)
        );
    }

    _aliasChanged(alias: string) {
        this.nameChange.emit(
            <Name>this.name.set('alias', alias)
        );
    }
}

