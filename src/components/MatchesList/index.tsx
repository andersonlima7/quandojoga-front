import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import MatchCard from '../MatchCard';
import moment from 'moment';
import { searchInto } from '../../utils/search';

interface MatchesListProps {
  searchKey: string;
  orderBy?: 'championship' | 'month' | 'description';
  filter?: { text: string; prop: string[] };
  isTeamPage?: boolean;
  isChampionshipPage?: boolean;
}

export default function MatchesList({
  searchKey,
  orderBy = 'championship',
  filter = { prop: [], text: '' },
  isTeamPage,
  isChampionshipPage
}: MatchesListProps) {
  const [matches, setMatches] = useState<MatchType[]>([]);
  const [currentMatches, setCurrentMatches] = useState<MatchType[]>(matches);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        let req = '';
        switch (orderBy) {
          case 'championship':
            req = `/matches/date/${searchKey}`;
            break;
          case 'month':
            req = `/matches/${searchKey}`;
            break;
          case 'description':
            req = `/matches/championship/${searchKey}`;
            break;
          default:
            break;
        }
        const response = await api.get(req);
        const { data } = await response;
        setMatches(data);
        setCurrentMatches(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatches();
  }, [searchKey]);

  useEffect(() => {
    if (filter.text === '') {
      setCurrentMatches(matches);
      return;
    }

    const filteredMatches = searchInto(matches, filter.prop, filter.text);
    setCurrentMatches(filteredMatches);
  }, [filter]);

  const groupMatchesByChampionship = () => {
    const groupedMatches: Record<
      string,
      { matches: MatchType[]; description: string }
    > = {};

    currentMatches?.forEach(match => {
      const championship = match.championship;

      if (!groupedMatches[championship]) {
        groupedMatches[championship] = {
          matches: [],
          description: match.description
        };
      }

      groupedMatches[championship].matches.push(match);
    });

    const sortedGroupedMatches = Object.entries(groupedMatches).sort(
      ([a], [b]) => a.localeCompare(b)
    );

    return sortedGroupedMatches.reduce((current, [championship, matches]) => {
      current[championship] = matches;
      return current;
    }, {} as Record<string, { matches: MatchType[]; description: string }>);
  };

  const groupMatchesByDescription = () => {
    const groupedMatches: Record<
      string,
      { matches: MatchType[]; description: string }
    > = {};

    matches.forEach(match => {
      const matchDate = moment(match.date, 'DD/MM/YY');
      const weekAndDescription = `${matchDate.isoWeek()}-${match.description}`;

      if (!groupedMatches[weekAndDescription]) {
        groupedMatches[weekAndDescription] = {
          matches: [],
          description: match.description
        };
      }

      groupedMatches[weekAndDescription].matches.push(match);
    });

    return groupedMatches;
  };

  const groupMatchesByMonth = () => {
    const groupedMatches: Record<string, MatchType[]> = {};

    currentMatches?.forEach(match => {
      const date = match.date;

      let currDate;
      const month = moment(date, 'DD/MM/YY').format('MMMM[,] YYYY');

      if (month.toUpperCase() === 'DATA INVÁLIDA') currDate = date;
      else {
        currDate = month;
      }
      if (!groupedMatches[currDate]) {
        groupedMatches[currDate] = [];
      }

      groupedMatches[currDate].push(match);
    });

    return groupedMatches;
  };

  if (orderBy === 'month') {
    const groupedMatches = groupMatchesByMonth();
    return (
      <Flex flexDirection="column">
        {Object.entries(groupedMatches).map(([month, matches]) => (
          <Box key={month} my="10">
            <Heading as="h2" fontSize="18px" mb="5px">
              {month}
            </Heading>
            <Flex w="100%" gap="10px" flexWrap="wrap">
              {matches.map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  teamPage={isTeamPage}
                  championshipPage={isChampionshipPage}
                />
              ))}
            </Flex>
          </Box>
        ))}
      </Flex>
    );
  } else {
    let groupedMatches;
    if (orderBy === 'championship')
      groupedMatches = groupMatchesByChampionship();
    else groupedMatches = groupMatchesByDescription();

    return (
      <Flex flexDirection="column">
        {Object.entries(groupedMatches).map(([championship, values]) => (
          <Box key={championship} my="10">
            <Box mb="5px">
              {orderBy === 'championship' && (
                <Box>
                  <Heading as="h2" fontSize="18px" mb="5px">
                    {championship}
                  </Heading>
                  <Text>{values.description}</Text>
                </Box>
              )}
              {orderBy === 'description' && <Text>{values.description}</Text>}
            </Box>
            <Flex w="100%" gap="10px" flexWrap="wrap">
              {values.matches.map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  teamPage={isTeamPage}
                  championshipPage={isChampionshipPage}
                />
              ))}
            </Flex>
          </Box>
        ))}
      </Flex>
    );
  }
}
