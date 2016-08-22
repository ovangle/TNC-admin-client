import {List, Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation,
    OnInit
} from '@angular/core';

import {CheckboxArray} from '../../../../utils/components/checkbox_array.component';

import {StaffType} from '../../type';
import {predefinedSkills} from './skills.model';


@Component({
    selector: 'staff-skills-input',
    template: `
    <fieldset>
        <legend>Relevant skills</legend>
        <checkbox-array
                [selectedValues]="skills"
                (selectedValuesChange)="skillsChange.emit($event)"
                [values]="predefinedSkills"
                [allowOther]="true">
        </checkbox-array>
    </fieldset>    
    `,
    directives: [CheckboxArray],
    styleUrls: [
        '../../../../../assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffSkillsInput implements OnInit {
    @Input() staffType:StaffType;

    @Input() skills:Set<string>;
    @Output() skillsChange = new EventEmitter<Set<string>>();

    predefinedSkills:List<string>;

    ngOnInit() {
        this.predefinedSkills = predefinedSkills(this.staffType);
    }
}

