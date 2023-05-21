import {
  Box,
  Flex,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  chakra
} from '@chakra-ui/react';
import moment, { Moment } from 'moment';
import { daysBetweenDates } from '../../utils/daysBetween';
import MatchesList from '../MatchesList';
import { useState } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
interface MatchDateProps {
  currentDate: Moment;
  numberOfDates: number;
  onDateChange: (date: any) => void;
}

export default function MatchDates({
  numberOfDates,
  currentDate,
  onDateChange
}: MatchDateProps) {
  const todayString = moment().format('DD-MM-YY');
  const today = moment(todayString);
  const currDate = moment(currentDate);
  const navigate = useNavigate();
  console.log(currDate.format('DD-MM-YY'));
  console.log(today.format('DD-MM-YY'));

  const startDate = () => {
    const diff = today.diff(currDate, 'days');
    if (diff === 0 || diff <= 2) {
      return today;
    } else {
      const day = currDate.subtract(diff, 'days');
      return day;
    }
  };
  let start = today;
  let end = today;
  let index = 0;
  if (today.diff(currDate, 'days') === 0) {
    start = startDate().subtract(1, 'days');
    end = start.clone().add(numberOfDates, 'days');
  } else {
    start = startDate().subtract(3, 'days');
    end = start.clone().add(numberOfDates, 'days');
    index = 2;
  }

  const dates = daysBetweenDates(start, end);

  return (
    <Tabs w="100%" variant="enclosed" minW="300px">
      <TabList>
        {dates.map((date, i) => {
          const currDate = moment(date, 'DD/MM/YY');
          const currDateFormatted = currDate.format('ddd[.], DD MMM');
          const days = currDateFormatted.split(',');
          const dayWeek = days[0];
          const dayMonth = days[1];

          // console.log(currDate.format('DD-MM-YY'))

          return (
            <Box
              key={currDateFormatted}
              w="100%"
              _hover={{ cursor: 'pointer' }}
              onClick={() => {
                console.log(currDate.format('DD-MM-YY'));
                onDateChange(currDate);
                navigate(`/${currDate.format('DD-MM-YY')}`);
              }}
            >
              <DayTab borderColor={index === i ? 'primary.500' : 'transparent'}>
                <Text>{dayWeek}</Text>
                <Text>{dayMonth}</Text>
              </DayTab>
            </Box>
          );
        })}
      </TabList>

      {/* <TabPanels>
        {dates.map(date => {
          return <TabPanel key={date}>{<MatchesList date={date} />}</TabPanel>;
        })}
      </TabPanels> */}
    </Tabs>
  );
}

const DayTab = chakra(Flex, {
  baseStyle: {
    w: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'smm',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    _hover: {
      borderColor: 'red.300'
    },
    _selected: {
      color: 'primary.500',
      borderColor: 'primary.500'
    },
    border: '1px solid',
    borderRadius: '4px',
    transition: '0.5s ease',
    textAlign: 'center'
  }
});
