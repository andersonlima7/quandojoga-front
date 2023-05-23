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
  Box,
  useBreakpointValue
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

  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

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
            {currentTeams
              ?.sort((a, b) =>
                removeAccents(a.team).localeCompare(removeAccents(b.team))
              )
              .map((team, index) => {
                const currentLetter = removeAccents(team.team.charAt(0));
                const isFirstLetter =
                  index === 0 ||
                  removeAccents(currentTeams[index - 1].team.charAt(0)) !==
                    currentLetter;

                return (
                  <>
                    {isFirstLetter && (
                      <Box key={`header-${currentLetter}`}>
                        <Text fontWeight="bold" textTransform="uppercase">
                          Letra {currentLetter}
                        </Text>
                      </Box>
                    )}
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
                  </>
                );
              })}
          </Flex>
        ) : (
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            {currentTeams
              ?.sort((a, b) =>
                removeAccents(a.team).localeCompare(removeAccents(b.team))
              )
              .map((team, index) => {
                const currentLetter = removeAccents(team.team.charAt(0));
                const isFirstLetter =
                  index === 0 ||
                  removeAccents(currentTeams[index - 1].team.charAt(0)) !==
                    currentLetter;

                return (
                  <>
                    {isFirstLetter && (
                      <GridItem key={`empty-${currentLetter}`} colSpan={5}>
                        <Text fontWeight="bold" textTransform="uppercase">
                          Letra {currentLetter}
                        </Text>
                      </GridItem>
                    )}
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
                  </>
                );
              })}
          </Grid>
        )}
      </Content>
    </Flex>
  );
}
