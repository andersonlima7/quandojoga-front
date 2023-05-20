import { Flex, Heading, Input } from '@chakra-ui/react';
import MatchCard from '../components/MatchCard';

import Calendar from '../components/Calendar';
import moment from 'moment';
import { useState } from 'react';
import MatchDates from '../components/MatchDate';
/**
 * Home page
 */
export default function Home() {
  const [currentDate, setCurrentDate] = useState(moment());
  // console.log(currentDate.format('ddd[.], DD [de] MMM'));

  return (
    <Flex flexDir="column" align="center" padding="0 10px" mt="10px" gap="20px">
      <Flex maxW="990px" flexDir="column">
        <Heading fontSize="mdd">Todos os jogos</Heading>
        <Flex w="100%" align="center" gap="10px">
          <Input w="100%" placeholder="Pesquise partidas" />
          <Calendar />
        </Flex>

        <MatchDates currentDate={currentDate} numberOfDates={5} />

        <MatchCard
          match={{
            team_home: 'Manchester City',
            team_home_logo:
              'https://image-service.onefootball.com/transform?w=128&dpr=2&image=https://images.onefootball.com/icons/teams/164/209.png',
            team_away: 'Real Madrid',
            team_away_logo:
              'https://image-service.onefootball.com/transform?w=128&dpr=2&image=https://images.onefootball.com/icons/teams/164/26.png',
            date: '17/05/23',
            time: '16:00',
            championship: 'UEFA Liga dos Campeões',
            championship_logo:
              'https://image-service.onefootball.com/transform?w=128&dpr=2&image=https://images.onefootball.com/icons/leagueColoredCompetition/128/5.png',
            description: 'Semi-final',
            location: 'Etihad Stadium',
            tv: 'HBO Max'
          }}
        />
      </Flex>
    </Flex>
  );
}
