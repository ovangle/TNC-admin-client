import {Iterable} from 'immutable';

import {Model, ModelBase} from 'caesium-model/model';

import {AlertLabel, CheckForAlertLabels} from '../../utils/alert_labels.component';

import {Name, Gender, Contact, Income} from '../basic';


@Model({kind: 'partner::Partner', isAbstract: true})
export abstract class Partner extends ModelBase implements CheckForAlertLabels {
    name: Name;
    gender: Gender;
    contact: Contact;
    income: Income;

    abstract checkForAlertLabels(): Iterable.Indexed<AlertLabel|Iterable.Indexed<any>>;
}
