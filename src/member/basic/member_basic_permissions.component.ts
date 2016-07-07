import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'member-basic-permissions',
    template: `
    <fieldset>
        <legend>Member Basic</legend>
        <permission-check [key]="member.basic::Address"
                          [actions]="['view', 'update']"
                          [permissions]="permissions" 
                          (permissionsChange)="permissionsChange.emit($event)">
            Address
        </permission-check>
        <permission-check [key]="member.basic::Contact"                    
                          [actions]="['view', 'update']" 
                          [permissions]="permissions"
                          (permissionsChange)="permissionsChange.emit($event)">
            Contact
        </permission-check>
        <permission-check [key]="member.basic::GasAccount"                     
                          [actions]="['view', 'update']"
                          [permissions]="permissions"
                          (permissionsChange)="permissionsChange.emit($event)">
            Gas Account
        </permission-check>
        <permission-check [key]="member.basic::ElectricityAccount"                   
                          [actions]="['view', 'update']"
                          [permissions]="permissions"
                          (permissionsChange)="permissionsChange.emit($event)">
            Electricity Account
        </permission-check>
        <permission-check [key]="member.basic::Income"  
                          [actions]="['view', 'update']"
                          [permissions]="permissions"
                          (permissionsChange)="permissionsChange.emit($event)">
            Income                   
        </permission-check>
        <permission-check [key]="member.basic::ResidentialStatus"
                          [action]="['view', 'update']"
                          [permissions]="permissions"
                          (permissionChange)="permissionsChange.emit($event)">
            Residential Status                   
        </permission-check>
    </fieldset>    
    `,
    directives: [],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberBasicPermissions {
    @Input() permissions: Set<string>;
    @Output() permissionsChange = new EventEmitter<Set<string>>();
}
