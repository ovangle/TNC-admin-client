import {Set} from 'immutable';
import {Model, ModelBase, Property, modelFactory} from 'caesium-json/model';
import {bool, list, str, date, num} from 'caesium-json/json_codecs';
import {composeCodecs, setToList} from '../../../utils/codecs';

const _STRING_SET_CODEC = composeCodecs(setToList, list(str));

@Model({kind: 'staff.induction_survey::StaffInductionSurvey'})
export class StaffInductionSurvey extends ModelBase {

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

export const staffInductionSurvey = modelFactory(StaffInductionSurvey);


