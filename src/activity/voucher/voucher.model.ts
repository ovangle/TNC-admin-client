import moment = require('moment');
import {Observable} from 'rxjs/Observable';

import {num} from 'caesium-json/json_codecs';
import {isBlank} from 'caesium-core/lang';
import {ModelBase, Model, Property} from 'caesium-json/model';

import {Member} from 'member';
import {startOfFinancialYear} from 'utils/date';

import {Task, TASK_CODEC} from '../task';
import {VoucherType, VOUCHER_TYPE_VALUES} from './voucher_type.model';
import {VoucherManager} from './voucher.manager';

@Model({kind: 'member::Voucher', isAbstract: true})
export class Voucher extends ModelBase {
    @Property({codec: TASK_CODEC, readOnly: true})
    task: Task;

    @Property({codec: num, required: false})
    vouchersInFinancialYear: number;

    getValue(): number {
        throw 'Abstract method Voucher.getValue()'
    }
    getType(): VoucherType {
        throw 'Abstract method Voucher.getType()'
    }
    _getIsValid(): boolean {
        throw 'Abstract method Voucher._getIsValid()'
    }

    getDisplayType(): string {
        return VOUCHER_TYPE_VALUES.get(this.getType());
    }


    get isValid() { return this._getIsValid(); }

    calcVouchersInFinancialYear(voucherManager: VoucherManager, member: Member): Observable<Voucher> {
        if (!isBlank(this.vouchersInFinancialYear)) {
            return Observable.of(this);
        }

        let today = moment();

        let numChemistVouchersIssued$ = voucherManager.getVouchersForMember(member, {
            type: 'CHEMIST',
            after: startOfFinancialYear(today.toDate()),
            before: today.toDate()
        }).map(results => results.count());

        return numChemistVouchersIssued$
            .map(resultCount => <Voucher>this.set('vouchersInFinancialYear', resultCount));
    }
}

