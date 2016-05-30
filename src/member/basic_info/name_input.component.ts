import {Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy} from 'angular2/core';

@Component({
    selector: 'name-input',
    template: `
        <label for="name-fieldset">{{label}}</label>
        <div name="name-fieldset" class="layout horizontal">
            <div class="first-name-input flex-1">
            <input type="text" class="form-control" placeholder="First name"
                [disabled]="disabled"
                [ngModel]="name.firstName"
                (ngModelChange)="_firstNameChange($event)"> 
            </div>    
            <div class="last-name-input flex-1">
            <input type="text" class="form-control" placeholder="Last name"
                [disabled]="disabled"
                [ngModel]="name.lastName"
                (ngModelChange)="_lastNameChange($event)">
            </div>    
        </div>          
    `,
    styles: [` 
    .first-name-input {
        margin-right: 1rem;
    }
    `],
    styleUrls: [
        'assets/css/flex.css',
        'assets/css/bootstrap.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class NameInput {
    @Input() name: {firstName: string, lastName: string};
    @Output() nameChange = new EventEmitter<{firstName: string, lastName: string}>();

    @Input() label: string;
    @Input() disabled: boolean;


    _firstNameChange(value: string) {
        this.nameChange.emit({firstName: value, lastName: this.name.lastName});
    }

    _lastNameChange(value: string) {
        this.nameChange.emit({firstName: this.name.firstName, lastName: value});
    }
}
