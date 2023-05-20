import moment, { Moment } from 'moment';

export const daysBetweenDates = (startDate: Moment, endDate: Moment) => {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) <= 0) {
    dates.push(currDate.clone().format('DD-MM-YY'));
  }

  return dates;
};
