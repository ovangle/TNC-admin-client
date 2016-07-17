import {List} from 'immutable';

import {StaffType} from '../../type';

export function predefinedSkills(staffType: StaffType) {
    if (staffType === 'FOODCARE_VOLUNTEER') {
        return FOODCARE_VOLUNTEER_SKILLS;
    } else if (staffType === 'OFFICE_VOLUNTEER') {
        return OFFICE_VOLUNTEER_SKILLS;
    } else {
        return List<string>();
    }
}


export const FOODCARE_VOLUNTEER_SKILLS = List<string>([
    'Customer service', 'Computer skills', 'Food handling', 'Phone/reception',
    'Shelf stacking', 'Talking to clients', 'Cash register', 'Orgainsation'
]);

export const OFFICE_VOLUNTEER_SKILLS = List<string>([
    'Computer', 'Typing', 'Data entry', 'Phone/Reception',
    'Filing', 'Talking to clients', 'Form filling', 'Organisation'
]);
