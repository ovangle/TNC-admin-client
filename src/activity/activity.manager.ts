import {Injectable} from '@angular/core';

import {Type} from 'caesium-core/lang';
import {ManagerBase, ManagerOptions} from 'caesium-json/manager';

import {Search2} from 'utils/search2';
import {DATE} from 'utils/string_encoders';

import {Member} from 'member';
import {Activity} from './activity.model';


@Injectable()
export class ActivityManager extends ManagerBase<Activity> {
    constructor(options: ManagerOptions) {
        super(Activity, options);
    }

    getModelSubtypes(): Type<any>[] { return []; }

    getActivitiesForMember(member: Member, params?: {before?: Date, after?: Date}): Search2<Activity> {
        let searchParams = {member: member.id};
        if (params) {
            searchParams = Object.assign({}, searchParams, {
                before: DATE(params.before),
                after: DATE(params.after)
            });
        }


        return new Search2<Activity>(this._requestFactory, '', searchParams, this.modelCodec);
    }

}
