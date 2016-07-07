import {Set} from 'immutable';

import {
    Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation
} from '@angular/core';

import {isBlank} from 'caesium-core/lang';

import {YesNoSelect} from '../../../utils/components/yesno_select.component';
import {DateInput} from '../../../utils/date/date_input.component';

import {StaffType} from '../type';
import {StaffInductionSurveyManager} from './induction_survey.manager';
import {StaffInductionSurvey} from './induction_survey.model';
import {StaffSkillsInput} from './skills';
import {StaffTraitsInput} from './traits';

@Component({
    selector: 'staff-induction-survey-input',
    template: `
    <fieldset>
        <legend>Induction</legend>
        
        <yesno-select [value]="survey.hasPreviousExperience"
                      (valueChange)="_hasPreviousExperienceChanged($event)"
                      [label]="'Previous experience in role'"
                      [allowNull]="false">
        </yesno-select>
        <date-input [label]="'Available to start'"
                    [date]="survey.dateAvailableToStart"
                    (dateChange)="_dateAvailableToStartChanged($event)"></date-input>
    </fieldset> 
        
        
    <staff-skills-input
        [staffType]="staffType"
        [skills]="survey.skills"
        (skillsChange)="_skillsChanged($event)">
    </staff-skills-input> 
    
    <staff-traits-input
        [staffType]="staffType"
        [traits]="survey.traits"
        (traitsChange)="_traitsChanged($event)">
    </staff-traits-input>
    `,
    directives: [YesNoSelect, StaffSkillsInput, StaffTraitsInput, DateInput],

    providers: [StaffInductionSurveyManager],
    styleUrls: [
       'assets/css/bootstrap.css'
    ],
    encapsulation: ViewEncapsulation.Native,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffInductionSurveyInput {

    @Input() staffType: StaffType;

    @Input() survey: StaffInductionSurvey;
    @Output() surveyChange = new EventEmitter<StaffInductionSurvey>();

    constructor(private surveyManager: StaffInductionSurveyManager) { }

    ngOnInit() {
        if (isBlank(this.survey)) {
            this.survey = this.surveyManager.create(StaffInductionSurvey, {});
            this.surveyChange.emit(this.survey);

        }
    }

    _hasPreviousExperienceChanged(prevExperience: boolean) {
        this.surveyChange.emit(
            <StaffInductionSurvey>this.survey.set('hasPreviousExperience', prevExperience)
        );
    }

    _skillsChanged(skills: Set<string>) {
        console.log(skills.toArray());
        this.surveyChange.emit(<StaffInductionSurvey>this.survey.set('skills', skills));
    }

    _traitsChanged(traits: Set<string>) {
        this.surveyChange.emit(<StaffInductionSurvey>this.survey.set('traits', traits));
    }


}
