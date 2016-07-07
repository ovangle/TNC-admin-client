import {Injectable} from '@angular/core';
import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions, SearchParameter} from 'caesium-model/manager';

import {StaffInductionSurvey} from './induction_survey.model';

@Injectable()
export class StaffInductionSurveyManager extends ManagerBase<StaffInductionSurvey> {
    getModelType(): Type { return StaffInductionSurvey; }
    getModelSubtypes(): Type[] { return []; }
    getSearchParameters(): SearchParameter[] { return undefined; }
    
    constructor(options: ManagerOptions) {
        super(options);
    }
}
    
