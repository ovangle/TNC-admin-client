import {Set} from 'immutable';

import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {identityConverter} from 'caesium-core/converter';
import {ManagerOptions, ManagerBase, SearchParameter} from 'caesium-json/manager';
import {Response} from 'caesium-json/manager/request/interfaces';

import {Name} from './basic';
import {Member} from './member.model';

@Injectable()
export class MemberManager extends ManagerBase<Member> {
    constructor(options: ManagerOptions) {
        super(Member, options);
    }

    getModelSubtypes(): Type<any>[] { return []; }

    save(member: Member): Response {
        var request = this._requestFactory.post('', this.modelCodec);
        request.setRequestBody(member);
        return request.send();

    }
}

export const MEMBER_SEARCH_PARAMS = [
    // Search based on the initial segements of the id
    {
        name: 'id',
        encoder: identityConverter,
        accessor: (member:Member) => member.id,
        matcher: (modelValue:string|number, paramValue:string) => {
            return modelValue.toString().startsWith(paramValue)
        }
    },
    // matches a set of inputs to substrings of the different inputs of the name.
    {
        name: 'name',
        encoder: (nameMatches:Set<string>) => nameMatches.join(','),
        accessor: (member:Member) => member.name,
        matcher: partialNameMatcher,
        refiner: partialNameRefiner
    }
];

function partialNameMatcher(modelValue: Name, paramValue: Set<string>): boolean {
    var lowerMemberName = {
        firstName: modelValue.firstName.toLowerCase(),
        lastName: modelValue.lastName.toLowerCase(),
    };

    var lowercaseParams = paramValue.valueSeq().map((value) => value.toLowerCase());

    var match = lowercaseParams.every((param) => {
        return lowerMemberName.firstName.includes(param)
            || lowerMemberName.lastName.includes(param)
    });
    console.log('\tis match: ', match);
    return match;
}

function partialNameRefiner(previousParamValue: Set<string>, currentParamValue: Set<string>) {

    var lowerCurrParam = currentParamValue.map((param) => param.toLowerCase()).toSet();
    var lowerPrevParam = previousParamValue.map((param) => param.toLowerCase()).toSet();

    function partialNameComponentRefiner(curr:string):boolean {
        return lowerPrevParam.contains(curr)
            || lowerPrevParam.some((prevParam) => prevParam.includes(curr));
    }

    return lowerCurrParam
        .every((currParam) => partialNameComponentRefiner(currParam));
}
