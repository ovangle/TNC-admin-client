import {List, Record} from 'immutable';
import {Observable} from 'rxjs/Observable';

import {forwardRef} from '@angular/core';
import {isBlank} from 'caesium-core/lang';
import {Codec} from 'caesium-core/codec';

import {EncodingException} from 'caesium-model/exceptions';

import {num, JsonObject} from 'caesium-model/json_codecs';

import {Member} from '../member.model';
import {MemberManager} from '../member.manager';
import {Name, NAME_CODEC} from '../basic';
import {Dependent} from './dependent.model';

/**
 * Member implements Carer, but
 */
export interface Carer {
    id: number;

    name: Name;

    /* only if resolved */
    dependents?: List<Dependent>;

    hasValidName(): boolean;
    isCarerResolved: boolean;
    resolveCarer(memberManager: MemberManager): Observable<Member>;

    equals(object: Object):boolean;
}

const _UNRESOLVED_CARER_RECORD = Record({
    id: null,
    name: new Name()
});

class _UnresolvedCarerRecord extends _UNRESOLVED_CARER_RECORD implements Carer {
    id: number;
    name: Name;

    isCarerResolved = false;

    resolveCarer(memberManager: MemberManager): Observable<Member> {
        var response = memberManager.getById(this.id);
        return response.handle({select: 200, decoder: memberManager.modelCodec});
    }

    hasValidName() {
        return !this.name.isAnonymous;
    }

    equals(object: Object): boolean {
        if (isBlank(object) || !(object instanceof _UnresolvedCarerRecord))
            return false;
        var _record = <_UnresolvedCarerRecord>(object);
        return super.equals(_record);
    }
}


//TODO: This should be a union of carers?
export const CARER_CODEC: Codec<Carer,JsonObject> = {
    encode: (input: Carer) => ({id: input.id}),
    decode: (obj: JsonObject): Carer => {
        if (isBlank(obj['id'])) {
            throw new EncodingException(`ID not present on Carer record ${obj}`)
        }
        let id = num.decode(obj['id']);
        let name = NAME_CODEC.decode(obj['name']);
        return new _UnresolvedCarerRecord({
            id: id,
            name: name
        });
    }
};

