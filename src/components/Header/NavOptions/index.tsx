import { useState, useEffect } from 'react';
import { Flex, Image, useBreakpointValue, Link } from '@chakra-ui/react';
import { api } from '../../../services/api';

import { Accordion } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Desktop from './Desktop';
import Mobile from './Mobile';

/**
 * Main teams and championships dropdown menu.
 */
export default function NavOptions() {
  const [teams, setTeams] = useState<
    { team_home: string; team_home_logo: string }[]
  >([]);
  const [championships, setChampionships] = useState<
    { championship: string; logo: string }[]
  >([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get(
          `/teams/championship/Brasileirão Série A`
        );
        const { data } = await response;
        setTeams(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const championshipsList = [
      'Brasileirão Série A',
      'Brasileirão Série B',
      'CONMEBOL Libertadores',
      'CONMEBOL Sudamericana',
      'Copa Betano do Brasil',
      'UEFA Liga dos Campeões',
      'Premier League',
      'LaLiga',
      'Bundesliga',
      'Serie A',
      'Ligue 1 Uber Eats',
      'Amistosos Internacionais'
    ];
    const fetchChampionships = async () => {
      const championshipsResponse = [];
      for (let i = 0; i < championshipsList.length; i++) {
        try {
          const response = await api.get(
            `/championship/${championshipsList[i]}`
          );
          const { data } = await response;

          if (data) {
            const logo = data.championship_logo;
            championshipsResponse.push({
              championship: championshipsList[i],
              logo
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
      setChampionships(championshipsResponse);
    };
    fetchChampionships();
  }, []);

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false
  });

  if (isMobile) {
    return (
      <Accordion allowToggle>
        <Mobile
          title="TIMES"
          description="Principais times do Brasil"
          baseboard="Todos os times"
          baseboardLink="/todos-os-times"
        >
          {teams.map(team => {
            return (
              <Flex key={team.team_home_logo} align="center" gap="2px">
                <Image src={team.team_home_logo} boxSize="25px" />
                <Link
                  fontSize="sm"
                  fontWeight="bold"
                  as={RouterLink}
                  to={`/times/${team.team_home}`}
                >
                  {team.team_home}
                </Link>
              </Flex>
            );
          })}
        </Mobile>
        <Mobile
          title="CAMPEONATOS"
          description="Principais campeonatos do mundo"
          baseboard="Todos os campeonatos"
          baseboardLink="/todos-os-campeonatos"
        >
          {championships.map(champ => {
            return (
              <Flex key={champ.logo} align="center" gap="2px">
                <Image src={champ.logo} boxSize="25px" />
                <Link
                  fontSize="sm"
                  fontWeight="bold"
                  as={RouterLink}
                  to={`/campeonatos/${champ.championship}`}
                >
                  {champ.championship}
                </Link>
              </Flex>
            );
          })}
        </Mobile>
      </Accordion>
    );
  }
  return (
    <Flex>
      <Desktop
        title="TIMES"
        description="Principais times do Brasil"
        baseboard="Todos os times"
        baseboardLink="/todos-os-times"
      >
        {teams.map(team => {
          return (
            <Flex key={team.team_home_logo} align="center" gap="2px">
              <Image src={team.team_home_logo} boxSize="25px" />
              <Link
                fontSize="sm"
                fontWeight="bold"
                as={RouterLink}
                to={`/times/${team.team_home}`}
              >
                {team.team_home}
              </Link>
            </Flex>
          );
        })}
      </Desktop>
      <Desktop
        title="CAMPEONATOS"
        description="Principais campeonatos do mundo"
        baseboard="Todos os campeonatos"
        baseboardLink="/todos-os-campeonatos"
      >
        {championships.map(champ => {
          return (
            <Flex key={champ.logo} align="center" gap="2px">
              <Image src={champ.logo} boxSize="25px" />
              <Link
                fontSize="sm"
                fontWeight="bold"
                as={RouterLink}
                to={`/campeonatos/${champ.championship}`}
              >
                {champ.championship}
              </Link>
            </Flex>
          );
        })}
      </Desktop>
    </Flex>
  );
}
