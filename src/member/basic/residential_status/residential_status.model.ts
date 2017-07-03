
import {Iterable, List, Record} from 'immutable';

import {recordCodec} from 'caesium-json/json_codecs';
import {AlertLabel, CheckForAlertLabels} from "utils/alert_label";

import {ResidentialStability, RESIDENTIAL_STABILITY_CODEC} from './residential_stability.model';
import {ResidenceType, RESIDENCE_TYPE_CODEC} from './residence_type.model';

const _RESIDENTIAL_STATUS_RECORD = Record({
    stability: 'NOT_DISCLOSED',
    type: 'NOT_DISCLOSED'
});

export class ResidentialStatus extends _RESIDENTIAL_STATUS_RECORD implements CheckForAlertLabels {
    stability: ResidentialStability;
    type: ResidenceType;

    checkForAlertLabels(): Iterable.Indexed<AlertLabel|Iterable.Indexed<any>> {
        //TODO: Any labels emitted?
        return List<AlertLabel>();
    }
}

export const RESIDENTIAL_STATUS_CODEC = recordCodec<ResidentialStatus>({
    stability: RESIDENTIAL_STABILITY_CODEC,
    type: RESIDENCE_TYPE_CODEC
}, (args) => new ResidentialStatus(args));
