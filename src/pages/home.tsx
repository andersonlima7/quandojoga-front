import { Flex, Link } from '@chakra-ui/react';
import MatchCard from '../components/MatchCard';

/**
 * Home page
 */
export default function Home() {
  return (
    <Flex flexDir="column" align="center" padding="0 10px">
      <Link>Home</Link>

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
          location: 'Etihad Stadium',
          tv: 'HBO Max'
        }}
      />
    </Flex>
  );
}
