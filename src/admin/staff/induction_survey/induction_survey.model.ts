import {Set} from 'immutable';
import {Model, ModelBase, Property} from 'caesium-model/model';
import {bool, list, str, date, num} from 'caesium-model/json_codecs';
import {composeCodecs, setToList} from '../../../utils/codecs';

import {StaffMember} from '../staff.model';

const _STRING_SET_CODEC = composeCodecs(setToList, list(str));

@Model({kind: 'staff.induction_survey::StaffInductionSurvey'})
export abstract class StaffInductionSurvey extends ModelBase {
    @Property({codec: bool})
    hasPreviousExperience: boolean;

    @Property({codec: _STRING_SET_CODEC, defaultValue: Set})
    skills: Set<string>;

    @Property({codec: _STRING_SET_CODEC, defaultValue: Set})
    traits: Set<string>;

    @Property({codec: date})
    dateAvailableToStart: Date;

    @Property({codec: num})
    desiredHoursPerWeek: number;

    @Property({codec: str})
    referredBy: string;

    @Property({codec: bool})
    hasUnderstoodPrivacyObligations: boolean;
}


