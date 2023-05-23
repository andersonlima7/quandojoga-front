import { useEffect, useState } from 'react';
import { api } from '../services/api';
import {
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Link,
  Input,
  useBreakpointValue,
  Spinner
} from '@chakra-ui/react';
import Content from '../layouts/content';
import { Link as RouterLink } from 'react-router-dom';
import { searchInto } from '../utils/search';
/**
 *  List of all Teams
 */
export default function AllTeams() {
  const [teams, setTeams] = useState<{ team: string; logo: string }[]>([]);
  const [currentTeams, setCurrentTeams] =
    useState<{ team: string; logo: string }[]>(teams);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get(`/teams`);
        const { data } = await response;
        setTeams(data);
        setCurrentTeams(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (filter === '') {
      setCurrentTeams(teams);
      return;
    }

    const filteredMatches = searchInto(teams, ['team'], filter);
    console.log(filteredMatches);
    setCurrentTeams(filteredMatches);
  }, [filter]);

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false
  });

  return (
    <Flex flexDirection="column" align="center">
      <Content align="left">
        <Text fontSize="22px">Todos os times</Text>
        <Input
          placeholder="Pesquise o time aqui"
          my={4}
          onChange={e => setFilter(e.target.value)}
        />
        {isMobile ? (
          <Flex flexDir="column" gap={5}>
            {Array.isArray(currentTeams) ? (
              currentTeams.map(team => {
                return (
                  <Flex alignItems="center" key={team.logo + team.team}>
                    <Image src={team.logo} alt={team.team} boxSize="25px" />
                    <Link
                      fontSize="sm"
                      fontWeight="bold"
                      as={RouterLink}
                      to={`/times/${team.team}`}
                    >
                      {team.team}
                    </Link>
                  </Flex>
                );
              })
            ) : (
              <Spinner />
            )}
          </Flex>
        ) : (
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            {Array.isArray(currentTeams) ? (
              currentTeams.map(team => {
                return (
                  <GridItem key={`${team.logo}${team.team}`}>
                    <Flex alignItems="center">
                      <Image src={team.logo} alt={team.team} boxSize="25px" />
                      <Link
                        fontSize="sm"
                        fontWeight="bold"
                        as={RouterLink}
                        to={`/times/${team.team}`}
                      >
                        {team.team}
                      </Link>
                    </Flex>
                  </GridItem>
                );
              })
            ) : (
              <Spinner />
            )}
          </Grid>
        )}
      </Content>
    </Flex>
  );
}
