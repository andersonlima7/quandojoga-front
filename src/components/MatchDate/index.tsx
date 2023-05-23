import { Box, Flex, Text, chakra, useColorModeValue } from '@chakra-ui/react';
import moment, { Moment } from 'moment';
import { daysBetweenDates } from '../../utils/daysBetween';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  let startDate;
  let endDate;
  let index = 0;
  const today = moment().endOf('day');
  const currDate = currentDate.endOf('day');

  if (currDate.diff(today, 'days') >= 7) {
    const rangeDays = Math.trunc(numberOfDates / 2);

    startDate = currDate.clone().subtract(rangeDays + 1, 'days');
    endDate = currDate.clone().add(rangeDays, 'days');
    index = currDate.diff(startDate, 'days') - 1;
  } else {
    startDate = today.clone().subtract(1, 'days');
    endDate = today.clone().add(numberOfDates - 1, 'days');
    index = currDate.diff(today, 'days');
  }
  const dates = daysBetweenDates(startDate, endDate);

  const borderColor = useColorModeValue('gray.150', 'gray.850');

  return (
    <Box w="100%">
      <Flex gap="16px">
        {dates.map((date, i) => {
          const currDate = moment(date, 'DD/MM/YY');
          const currDateFormatted = currDate.format('ddd[.], DD MMM');
          const days = currDateFormatted.split(',');
          const dayWeek = days[0];
          const dayMonth = days[1];

          return (
            <Box
              key={currDateFormatted}
              w="100%"
              maxW="169px"
              _hover={{ cursor: 'pointer' }}
              onClick={() => {
                console.log(currDate.format('DD-MM-YY'));
                onDateChange(currDate);
                navigate(`/?date=${currDate.format('DD-MM-YY')}`);
              }}
            >
              <DayTab
                borderColor={index === i ? 'primary.500' : borderColor}
                color={index === i ? 'primary.500' : 'inherit'}
              >
                <Text>{dayWeek}</Text>
                <Text>{dayMonth}</Text>
              </DayTab>
            </Box>
          );
        })}
      </Flex>

      {/* <TabPanels>
        {dates.map(date => {
          return <TabPanel key={date}>{<MatchesList date={date} />}</TabPanel>;
        })}
      </TabPanels> */}
    </Box>
  );
}

const DayTab = chakra(Flex, {
  baseStyle: {
    w: '100%',
    maxW: '169px',
    h: ['40px', '53px'],
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'smm',
    fontWeight: '800',
    whiteSpace: 'nowrap',
    _hover: {
      borderColor: 'red.300'
    },
    border: '1px solid',
    borderRadius: '4px',
    transition: '0.5s ease',
    textAlign: 'center'
  }
});
