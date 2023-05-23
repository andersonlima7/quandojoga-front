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
  useBreakpointValue
} from '@chakra-ui/react';
import Content from '../layouts/content';
import { Link as RouterLink } from 'react-router-dom';
import { searchInto } from '../utils/search';
/**
 *  List of all championships
 */
export default function AllChampionships() {
  const [championships, serChampionships] = useState<
    { championship: string; championship_logo: string }[]
  >([]);
  const [currentChampionships, setCurrentChampionships] =
    useState<{ championship: string; championship_logo: string }[]>(
      championships
    );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get(`/championship`);
        const { data } = await response;
        serChampionships(data);
        setCurrentChampionships(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (filter === '') {
      setCurrentChampionships(championships);
      return;
    }

    const filteredMatches = searchInto(championships, ['championship'], filter);
    setCurrentChampionships(filteredMatches);
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
        <Text fontSize="22px">Todos os campeonatos</Text>
        <Input
          placeholder="Pesquise o campeonato aqui"
          my={4}
          onChange={e => setFilter(e.target.value)}
        />
        {isMobile ? (
          <Flex flexDir="column" gap={5}>
            {currentChampionships.map(championship => {
              return (
                <Flex
                  alignItems="center"
                  key={
                    championship.championship_logo + championship.championship
                  }
                >
                  <Image
                    src={championship.championship_logo}
                    alt={championship.championship}
                    boxSize="25px"
                  />
                  <Link
                    fontSize="sm"
                    fontWeight="bold"
                    as={RouterLink}
                    to={`/campeonatos/${championship.championship}`}
                  >
                    {championship.championship}
                  </Link>
                </Flex>
              );
            })}
          </Flex>
        ) : (
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            {currentChampionships.map(championship => {
              return (
                <GridItem
                  key={
                    championship.championship_logo + championship.championship
                  }
                >
                  <Flex alignItems="center">
                    <Image
                      src={championship.championship_logo}
                      alt={championship.championship}
                      boxSize="25px"
                    />
                    <Link
                      fontSize="sm"
                      fontWeight="bold"
                      as={RouterLink}
                      to={`/campeonatos/${championship.championship}`}
                    >
                      {championship.championship}
                    </Link>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        )}
      </Content>
    </Flex>
  );
}
