import {Iterable} from 'immutable';

import {Model, ModelBase} from 'caesium-model/model';

import {AlertLabel} from '../utils/alert_labels.component';

import {Gender} from '../member/basic_info/gender.enum';
import {ContactInfo} from '../member/contact/contact_info.record';
import {IncomeInfo} from '../member/income/income_info.record';


@Model({kind: 'partner::Partner' /*abstract: true*/})
export abstract class Partner extends ModelBase {
    firstName: string;
    lastName: string;
    gender: Gender;
    contact: ContactInfo;
    income: IncomeInfo;

    abstract checkForAlertLabels(): Iterable.Indexed<AlertLabel | Iterable.Indexed<any>>;
}
