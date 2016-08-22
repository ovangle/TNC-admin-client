import {Map, Set} from 'immutable';
import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {CapitalizeFirstPipe} from '../../utils/pipes/capitalize_first.pipe';

import {PermissionMap} from './permission_map.model';

@Component({
    selector: 'permission-check',
    template: `
    <div class="layout horizontal">
        <span><content></content></span>
        <div class="checkbox" *ngFor="let action of actions">
            <label>
                <input type="checkbox" 
                       [ngModel]="_checkPermission(action)"
                       (ngModelChanged)="_permissionChanged(action, $event)"
                {{ action | capitalizeFirst }}
            </label>
        </div>
    </div>
    `,
    directives: [],
    styleUrls: [
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/flex.css'
    ],
    pipes: [CapitalizeFirstPipe],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionCheck {
    @Input() key: string;
    @Input() actions: Array<string>;

    @Input() permissions: PermissionMap;
    @Output() permissionsChange = new EventEmitter<PermissionMap>();

    _checkPermission(action: string): boolean {
        return this.permissions.get(this.key, Set<string>())
            .contains(action);
    }

    _permissionChanged(action: string, value: boolean) {
        var activeActions = this.permissions.get(this.key, Set<string>());

        if (value) {
            activeActions = activeActions.add(action);
        } else {
            activeActions = activeActions.remove(action);
        }

        this.permissionsChange.emit(
            this.permissions.set(this.key, activeActions)
        );
    }
}


