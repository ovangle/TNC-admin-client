import {Pipe, PipeTransform} from '@angular/core';

import {ResidenceType} from './residence_type.model';

@Pipe({name: 'residenceType'})
export class ResidenceTypePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        switch(value) {
            case ResidenceType.None:
                return 'None/Not Disclosed';
            case ResidenceType.CaravanPark:
                return 'Caravan park';
            case ResidenceType.Motel:
                return 'Motel';
            case ResidenceType.PrivateRentalLandlord:
                return 'Private rental (landlord)';
            case ResidenceType.PrivateRentalRealEstate:
                return 'Private rental (real estate)';
            case ResidenceType.PublicHousing:
                return 'Public housing';
            case ResidenceType.CommunityHousing:
                return 'Community housing';
            case ResidenceType.Boarding:
                return 'Boarding';
            case ResidenceType.OwnHome:
                return 'Own home';
            default:
                throw new TypeError('Invalid Residence type value: ' + value);
        }
    }
}
