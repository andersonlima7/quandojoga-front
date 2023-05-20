import {
  Box,
  Flex,
  Heading,
  Input,
  useBreakpointValue,
  useMediaQuery
} from '@chakra-ui/react';
import MatchCard from '../components/MatchCard';

import Calendar from '../components/Calendar';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import MatchDates from '../components/MatchDate';
import MatchesList from '../components/MatchesList';
/**
 * Home page
 */
export default function Home() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [currentSelectedDate, setCurrentSelectedDate] = useState(
    currentDate.format('DD-MM-YY')
  );

  const [overflow] = useMediaQuery('(max-width: 380px)');

  return (
    <Flex
      flexDir="column"
      align="center"
      padding={['30px 10px', '30px 10px', '30px 100px']}
      mt="10px"
      gap="20px"
      overflowX={overflow ? 'visible' : 'hidden'}
    >
      <Flex flexDir="column" w="100%" gap="10px">
        <Heading fontSize="lg" mb="30px">
          Todos os jogos
        </Heading>
        <Flex w="100%" align="center" gap="10px">
          <Input w="100%" placeholder="Pesquise partidas" />
          <Calendar />
        </Flex>

        <MatchDates
          currentDate={currentDate}
          numberOfDates={5}
          onChange={date => setCurrentSelectedDate(date)}
        />
      </Flex>
    </Flex>
  );
}
