import {
  Flex,
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

interface MatchDateProps {
  currentDate: Moment;
  numberOfDates: number;
  onChange: (date: string) => void;
}

export default function MatchDates({
  numberOfDates,
  currentDate,
  onChange
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

  const onDateChange = (index: number) => {
    onChange(dates[index]);
  };

  return (
    <Tabs w="100%" variant="enclosed" onChange={onDateChange} minW="300px">
      <TabList>
        {dates.map(date => {
          const currDate = moment(date, 'DD/MM/YY').format('ddd[.], DD MMM');
          const days = currDate.split(',');
          const dayWeek = days[0];
          const dayMonth = days[1];

          return (
            <DayTab key={currDate}>
              <Text>{dayWeek}</Text>
              <Text>{dayMonth}</Text>
            </DayTab>
          );
        })}
      </TabList>

      <TabPanels>
        {dates.map(date => {
          return <TabPanel key={date}>{<MatchesList date={date} />}</TabPanel>;
        })}
      </TabPanels>
    </Tabs>
  );
}

const DayTab = chakra(Tab, {
  baseStyle: {
    w: '100%',

    display: 'flex',
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
    }
  }
});
