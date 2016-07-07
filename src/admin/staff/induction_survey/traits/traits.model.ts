import {List} from 'immutable';

import {StaffType} from '../../type';

export function predefinedTraits(staffType: StaffType): List<string> {
    switch (staffType) {
        case StaffType.FoodcareVolunteer:
            return FOODCARE_VOLUNTEER_TRAITS;
        case StaffType.OfficeVolunteer:
            return OFFICE_VOLUNTEER_TRAITS;
        default:
            return List<string>();
    }

}

const FOODCARE_VOLUNTEER_TRAITS = List<string>([
    'Friendly', 'Shy', 'Team player', 'Resourceful', 'Confident', 'Efficient', 'Accepting',
    'Organised', 'Focused', 'Patient', 'Professional', 'Dependable', 'Reliable',
    'Logical'
]);

const OFFICE_VOLUNTEER_TRAITS = List<string>([
    'Friendly', 'Shy', 'Outgoing', 'Empathetic', 'Confident', 'Efficient', 'Accepting',
    'Intuitive', 'Insightful', 'Adventurous', 'Professional', 'Careful', 'Focused',
    'Quiet', 'Loyal', 'Rational', 'Patient', 'Meticulous', 'Cheerful', 'Open-minded',
    'Genuine', 'Dependable', 'Honest', 'Creative', 'Resourceful', 'Perceptive',
    'Independent', 'Decisive', 'Organised', 'Logical', 'Reliable', 'Sensitive'
]);
