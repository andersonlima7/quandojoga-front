import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import React from 'react';
import moment, { Moment } from 'moment';
import { daysBetweenDates } from '../../utils/daysBetween';

interface MatchDateProps {
  currentDate: Moment;
  numberOfDates: number;
}

export default function MatchDates({
  numberOfDates,
  currentDate
}: MatchDateProps) {
  const today = moment();

  const startDate = () => {
    const diff = today.diff(currentDate, 'days');
    if (diff === 0 || diff <= 2) {
      return today;
    } else {
      const day = currentDate.subtract(diff, 'days');
      return day;
    }
  };

  const start = startDate().subtract(1, 'days');
  const end = start.clone().add(numberOfDates, 'days');

  const dates = daysBetweenDates(start, end);

  return (
    <DatesDay>
      {dates.map(date => {
        const currDate = moment(date, 'DD/MM/YY').format('ddd[.], DD [de] MMM');
        const days = currDate.split(',');
        const dayWeek = days[0];
        const dayMonth = days[1];
        console.log(currDate);

        return (
          <Day key={currDate}>
            <Text>{dayWeek}</Text>
            <Text>{dayMonth}</Text>
          </Day>
        );
      })}
    </DatesDay>
  );
}

const DatesDay = chakra(Flex, {
  baseStyle: {
    w: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Day = chakra(Flex, {
  baseStyle: {
    w: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'smm'
  }
});
