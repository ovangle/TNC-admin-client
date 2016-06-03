import {Pipe, PipeTransform} from '@angular/core';

import {ArgumentError} from '../../../../../caesium-model/exceptions';
import {CarerRelType} from './carer_rel_type.model';

@Pipe({name: 'carerRelType'})
export class CarerRelTypePipe implements PipeTransform {
    transform(value:any, args:any):any {
        switch (value) {
            case CarerRelType.NotDisclosed:
                return 'Not disclosed';
            case CarerRelType.Parent:
                return 'Parent';
            case CarerRelType.PartnerOfParent:
                return 'Partner of parent';
            case CarerRelType.Sibling:
                return 'Sibling';
            case CarerRelType.OtherRelation:
                return 'Other family relation (eg. grandparent, uncle, aunt etc.)';
            case CarerRelType.NoFamilialRelation:
                return 'No family relation (eg. legal guardian, foster parent etc.)';
            default:
                throw new ArgumentError('Not a valid carer rel type: ' + value);
        }
    }

}
