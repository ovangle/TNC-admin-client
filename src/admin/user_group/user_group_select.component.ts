import {List} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
    ChangeDetectorRef, ViewChild, ElementRef
} from '@angular/core';

import {UserGroupManager} from './user_group.manager';
import {UserGroup} from './user_group.model';


@Component({
    selector: 'user-group-select',
    template: `
    <div class="form-group">
        <label for="user-groups-select">User groups</label>
        <select #select id="user-groups-select"
                class="form-control"
                (change)="_setSelected($event.target)"
                multiple>
            <option *ngFor="let group of userGroups.toArray(); let i=index" 
                    [selected]="_isSelected(group)"
                    (mousedown)="_selectOnClick($event)"
                    [value]="i">{{group.name}}</option>
        </select>
    </div>
   `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGroupSelect {
    @Input() selectedGroups: List<UserGroup>;
    @Output() selectedGroupsChange = new EventEmitter<List<UserGroup>>();

    @ViewChild('select') selectElem: ElementRef;

    userGroups: List<UserGroup>;

    constructor(private groupManager: UserGroupManager,
                private changeDetector: ChangeDetectorRef) {
        this.userGroups = List<UserGroup>();
    }

    _isSelected(group: UserGroup) {
        return this.selectedGroups.valueSeq()
            .some(selectedGroup => selectedGroup.name === group.name);
    }


    ngOnInit() {
        this.groupManager.listGroups().forEach((groups) => {
            this.userGroups = groups;
            this.changeDetector.markForCheck();
        })
    }

    _setSelected(selectElement: HTMLSelectElement) {
        var selectOptions = List<HTMLOptionElement>(selectElement.options);
        var userGroups = selectOptions
            .filter(option => option.selected)
            .map(option => Number.parseInt(option.value))
            .map(index => this.userGroups.get(index))
            .toList();

        this.selectedGroupsChange.emit(userGroups);
    }

    _selectOnClick(event: Event) {
        event.preventDefault();
        var option = <HTMLOptionElement>event.target;
        option.selected = !option.selected;
        this._setSelected(this.selectElem.nativeElement);
        return false;
    }
}

