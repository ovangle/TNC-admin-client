import {OrderedMap} from 'immutable';

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

const _RESIDENCE_TYPE_SERIALIZED_VALUES = OrderedMap<ResidenceType, string>([
    [ResidenceType.None, 'NONE'],
    [ResidenceType.CaravanPark, 'CARAVAN_PARK'],
    [ResidenceType.Motel, 'MOTEL'],
    [ResidenceType.PrivateRentalRealEstate, 'PRIVATE_RENTAL_REAL_ESTATE'],
    [ResidenceType.PrivateRentalLandlord, 'PRIVATE_RENTAL_LANDLORD'],
    [ResidenceType.PublicHousing, 'PUBLIC_HOUSING'],
    [ResidenceType.CommunityHousing, 'COMMUNITY_HOUSING'],
    [ResidenceType.OwnHome, 'OWN_HOME']
]);

export const RESIDENCE_TYPE_VALUES =_RESIDENCE_TYPE_SERIALIZED_VALUES.keySeq().toList();

export const RESIDENCE_TYPE_CODEC = enumToString<ResidenceType>(_RESIDENCE_TYPE_SERIALIZED_VALUES);

