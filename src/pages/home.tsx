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
import Content from '../layouts/content';
/**
 * Home page
 */
export default function Home() {
  const searchParams = new URLSearchParams(window.location.search);
  const date = searchParams.get('date');

  console.log(date);
  const currDate = moment(date ?? moment(), 'DD-MM-YY');

  const [currentDate, setCurrentDate] = useState(currDate);

  const [overflow] = useMediaQuery('(max-width: 380px)');

  const numberOfDates =
    useBreakpointValue({
      base: 5,
      lg: 7
    }) ?? 5;

  return (
    <Flex
      flexDir="column"
      align="center"
      overflowX={overflow ? 'visible' : 'hidden'}
    >
      <Content>
        <Flex flexDir="column" w="100%" gap="10px">
          <Heading fontSize="lg" mb="30px">
            TODOS OS JOGOS
          </Heading>

          <Flex w="100%" align="center" gap="10px">
            <Input w="100%" placeholder="Pesquise partidas" />
            <Calendar
              date={currentDate}
              onDateChange={e => setCurrentDate(e)}
            />
          </Flex>
          <Flex w="100%" justify="left">
            <MatchDates
              currentDate={currentDate}
              numberOfDates={numberOfDates}
              onDateChange={e => setCurrentDate(e)}
            />
          </Flex>

          <MatchesList date={currDate.format('DD-MM-YY')} />
        </Flex>
      </Content>
    </Flex>
  );
}
