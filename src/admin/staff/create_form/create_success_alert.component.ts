import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

import {CreateStaffResponse} from './create_staff.model';

@Component({
    selector: 'staff-create-success-alert',
    template: `
    <div class="modal-header">
        <h3>Staff member created</h3>
    </div>    
    <div class="modal-body">
        <p>Temporary password:</p> 
        <p><b>note:</b><em>The password is temporary and should be changed by the user on the first login.</em></p>
        <p><code>{{createResponse.password}}</code></p>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" (click)="confirm.emit($event)">OK</button>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCreateSuccessAlert {
    @Input() createResponse: CreateStaffResponse;
    @Output() confirm = new EventEmitter<any>();
}
