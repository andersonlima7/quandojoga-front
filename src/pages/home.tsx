import {
  Flex,
  Heading,
  Input,
  useBreakpointValue,
  useMediaQuery
} from '@chakra-ui/react';

import Calendar from '../components/Calendar';
import moment from 'moment';
import { useState } from 'react';
import MatchDates from '../components/MatchDate';
import { useParams } from 'react-router-dom';
import MatchesList from '../components/MatchesList';
/**
 * Home page
 */
export default function Home() {
  const { date } = useParams();
  const currDate = moment(date ?? moment(), 'DD-MM-YY');

  const [currentDate, setCurrentDate] = useState(currDate);

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
          <Calendar date={currentDate} onDateChange={e => setCurrentDate(e)} />
        </Flex>

        <MatchDates
          currentDate={currentDate}
          numberOfDates={5}
          onDateChange={e => setCurrentDate(e)}
        />

        <MatchesList date={currDate.format('DD-MM-YY')} />
      </Flex>
    </Flex>
  );
}
