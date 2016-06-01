import {Pipe, PipeTransform} from '@angular/core';

import {Iterable, List, Map, Record} from 'immutable';

import {enumToString, recordCodec} from 'caesium-model/json_codecs';
import {AlertLabel, CheckForAlertLabels} from "../../utils/alert_label/alert_label";

import {ResidentialStability, residentialStabilityCodec} from './residential_stability.enum';
import {ResidenceType, residenceTypeCodec} from './residence_type.enum';

const _RESIDENTIAL_STATUS_RECORD = Record({
    stability: ResidentialStability.NotDisclosed,
    type: ResidenceType.None
});

export class ResidentialStatus extends _RESIDENTIAL_STATUS_RECORD implements CheckForAlertLabels {
    stability: ResidentialStability;
    type: ResidenceType;

    checkForAlertLabels(): Iterable<number,AlertLabel|Iterable<number,any>> {
        //TODO: Any labels emitted?
        return List<AlertLabel>();
    }
}

export const residentialStatusCodec = recordCodec({
    stability: residentialStabilityCodec,
    type: residenceTypeCodec
}, (args) => new ResidentialStatus(args));
