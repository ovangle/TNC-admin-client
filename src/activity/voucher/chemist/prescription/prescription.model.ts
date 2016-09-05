import {Record} from 'immutable';

import {str, bool, recordCodec} from 'caesium-model/json_codecs';

const _CHEMIST_PRESCRIPTION_RECORD = Record({
    name: '',
    isPBS: false,
});

export class ChemistPrescription extends _CHEMIST_PRESCRIPTION_RECORD {
    /**
     * The name of the medication, as printed on the description.
     */
    name: string;

    /**
     * Is the prescription a PBS prescription.
     */
    isPBS: boolean;

    /**
     * The cost of the medicine, including any PBS discounts.
     */
    value: number;


    constructor(args?: {isPBS: boolean}) {
        super(args);
    }
}

export const CHEMIST_PRESCRIPTION_CODEC = recordCodec<ChemistPrescription>({
    name: str,
    isPBS: bool
}, (args: any) => new ChemistPrescription(args));

