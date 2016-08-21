import {OrderedMap} from 'immutable';
import {Codec, identity} from 'caesium-core/codec';

export type TaskType= 'ISSUE_VOUCHER' | 'EXTERNAL_SERVICE_REFERRAL';

export const TASK_TYPE_VALUES = OrderedMap<TaskType, string>([
    ['ISSUE_VOUCHER', 'Issue voucher'],
    ['EXTERNAL_SERVICE_REFERRAL', 'Refer to external service']
]);

export const TASK_TYPE_CODEC: Codec<TaskType,string> = identity;



