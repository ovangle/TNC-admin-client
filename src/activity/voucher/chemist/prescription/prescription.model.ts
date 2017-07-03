import {Observable} from 'rxjs/Observable';
import {Record} from 'immutable';

import {isBlank} from 'caesium-core/lang';
import {num, str, bool, identity, recordCodec} from 'caesium-json/json_codecs';

import {Member, MemberManager} from '../../../../member';
import {Dependent, DependentManager} from '../../../../member/dependents';

const _CHEMIST_PRESCRIPTION_RECORD = Record({
    name: '',
    isPBS: false,
    recipient: null,
    value: null
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

    recipient: {kind: string, id: number};

    constructor(args?: {isPBS: boolean}) {
        super(args);
    }
    setRecipientOption(recipientOption: string) {
        if (isBlank(recipientOption) || recipientOption === '') {
            return super.set('recipient', null);
        }
        let [kind, id] = recipientOption.split('--');
        return super.set('recipient', {kind, id});
    }

    setRecipient(memberOrDependent: Member | Dependent): ChemistPrescription {
        if (isBlank(memberOrDependent)) {
            return <ChemistPrescription>super.set('recipient', null);
        }

        let kind: string;
        if (memberOrDependent instanceof Member) {
            kind = 'member::Member';
        } else if (memberOrDependent instanceof Dependent) {
            kind = 'member.dependent::Dependent';
        }

        let id = memberOrDependent.id;
        return <ChemistPrescription>super.set('recipient', {kind, id});


    }


    getRecipient(memberManager: MemberManager, dependentManager: DependentManager): Observable<Member | Dependent> {
        if (this.recipient === null) {
            return Observable.of(null);
        }
        let manager: MemberManager | DependentManager;
        if (this.recipient.kind === 'member::Member') {
            manager = memberManager;
        } else if (this.recipient.kind === 'member.dependent::Dependent') {
            manager = dependentManager;
        } else {
            return Observable.throw(`Invalid kind for chemist recipient: ${this.recipient.kind}`);
        }
        return manager.getById(this.recipient.id)
            .handle<Member | Dependent>({
                select: 200,
                decoder: manager.modelCodec
            });
    }
}

export const CHEMIST_PRESCRIPTION_CODEC = recordCodec<ChemistPrescription>({
    name: str,
    isPBS: bool,
    value: num,
    recipient: identity
}, (args: any) => new ChemistPrescription(args));

