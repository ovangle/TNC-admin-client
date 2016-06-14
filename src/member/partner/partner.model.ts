import {Observable} from 'rxjs/Observable';
import {Iterable} from 'immutable';

import {Model, ModelBase, BackRefProperty} from 'caesium-model/model';

import {AlertLabel, CheckForAlertLabels} from '../../utils/alert_labels.component';

import {Name, Gender, Contact, Income} from '../basic';
import {Member} from '../member.model';
import {Carer, CarerManager} from '../carer';

@Model({kind: 'partner::Partner', isAbstract: true})
export abstract class Partner extends ModelBase implements CheckForAlertLabels {
    name: Name;
    gender: Gender;
    contact: Contact;
    income: Income;

    carer: Carer;

    @BackRefProperty({to: Member, refProp: 'partnerId'})
    member: Member;


    abstract checkForAlertLabels(): Iterable.Indexed<AlertLabel|Iterable.Indexed<any>>;

    abstract resolveCarer(carerManager: CarerManager): Observable<Partner>;
}
