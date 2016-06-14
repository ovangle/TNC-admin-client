import {Model, ModelBase, Property} from 'caesium-model/model';
import {Voucher} from '../voucher.model';

import {EAPAAssessment, EAPA_ASSESSMENT_CODEC} from './assessment';

@Model({kind: 'member.voucher::EAPAVoucher', superType: Voucher})
export class EAPAVoucher extends Voucher {
    @Property({
        codec: EAPA_ASSESSMENT_CODEC, 
        defaultValue: () => new EAPAAssessment()
    })
    assessment: EAPAAssessment;

}
