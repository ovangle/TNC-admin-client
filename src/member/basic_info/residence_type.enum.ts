import {Map} from 'immutable';

import {Pipe, PipeTransform} from '@angular/core';

import {enumToString} from 'caesium-model/json_codecs';


export const enum ResidenceType {
    None,
    CaravanPark,
    Motel,
    PrivateRentalLandlord,
    PrivateRentalRealEstate,
    PublicHousing,
    CommunityHousing,
    Boarding,
    OwnHome
}

const _RESIDENCE_TYPE_SERIALIZED_VALUES = Map<string,ResidenceType>({
    'NONE': ResidenceType.None,
    'CARAVAN_PARK': ResidenceType.CaravanPark,
    'MOTEL': ResidenceType.Motel,
    'PRIVATE_RENTAL_REAL_ESTATE': ResidenceType.PrivateRentalRealEstate,
    'PRIVATE_RENTAL_LANDLORD': ResidenceType.PrivateRentalLandlord,
    'PUBLIC_HOUSING': ResidenceType.PublicHousing,
    'COMMUNITY_HOUSING': ResidenceType.CommunityHousing,
    'OWN_HOME': ResidenceType.OwnHome
});

export const RESIDENCE_TYPE_VALUES =_RESIDENCE_TYPE_SERIALIZED_VALUES.valueSeq().toList();

export const residenceTypeCodec = enumToString<ResidenceType>(_RESIDENCE_TYPE_SERIALIZED_VALUES.flip());

@Pipe({name: 'residenceType'})
export class ResidenceTypePipe implements PipeTransform {
    transform(value: any, args: any[]): any {
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
                throw new TypeError('Invalid Residence type: ${value}');
        }
    }
}
