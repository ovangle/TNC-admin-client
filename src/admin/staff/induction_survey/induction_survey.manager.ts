import {Injectable} from '@angular/core';
import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions} from 'caesium-json/manager';

import {StaffInductionSurvey} from './induction_survey.model';

@Injectable()
export class StaffInductionSurveyManager extends ManagerBase<StaffInductionSurvey> {
    getModelSubtypes(): Type<any>[] { return []; }

    constructor(options: ManagerOptions) {
        super(StaffInductionSurvey, options);
    }
}

