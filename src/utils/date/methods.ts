import moment = require('moment');

export function startOfFinancialYear(date: Date): Date {
    let m = moment(date);
    if (m.month() <= 6) {
        m = m.subtract(1, 'year');
    }
    return m.month(7).date(0).startOf('date').toDate();
}
