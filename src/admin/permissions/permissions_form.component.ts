import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {PermissionMap} from './permission_map.model';

@Component({
    selector: 'permissions-form',
    template: `
        <h3>General</h3>  
        
        <h3>Member</h3>
        <member-basic-permissions 
            [permissions]="permissionMap"
            (permissionsChange)="permissionsChange.emit($event)">
        </member-basic-permissions>
     
    `,
    directives: [],
    styles: [
        require('bootstrap/dist/css/bootstrap.css')
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsForm {
    @Input() permissions: PermissionMap;
    @Output() permissionsChange= new EventEmitter<PermissionMap>();

}
