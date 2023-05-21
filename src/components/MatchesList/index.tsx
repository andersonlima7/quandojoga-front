import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import MatchCard from '../MatchCard';

interface MatchesListProps {
  date: string;
  orderBy?: 'championship' | 'month';
}

export default function MatchesList({ date, orderBy }: MatchesListProps) {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get(`/matches/date/${date}`);
        const { data } = await response;
        setMatches(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMatches();
  }, [date]);

  const groupMatchesByChampionship = () => {
    const groupedMatches: Record<
      string,
      { matches: MatchType[]; description: string }
    > = {};

    matches.forEach(match => {
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

  const groupMatchesByMonth = () => {
    const groupedMatches: Record<string, MatchType[]> = {};

    matches.forEach(match => {
      const date = match.date;
      const month = date.split('/')[1]; // Extrair o mês da data

      if (!groupedMatches[month]) {
        groupedMatches[month] = [];
      }

      groupedMatches[month].push(match);
    });

    return groupedMatches;
  };

  if (orderBy === 'month') {
    const groupedMatches = groupMatchesByMonth();
    return (
      <Flex flexWrap="wrap" w="100%" gap="10px">
        {Object.entries(groupedMatches).map(([month, matches]) => (
          <Box key={month}>
            <Heading as="h2" fontSize="18px" mb="5px">
              {month}
            </Heading>
            {matches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </Box>
        ))}
      </Flex>
    );
  } else {
    const groupedMatches = groupMatchesByChampionship();

    return (
      <Flex flexDirection="column">
        {Object.entries(groupedMatches).map(([championship, values]) => (
          <Box key={championship} my="10">
            <Box mb="5px">
              <Heading as="h2" fontSize="18px" mb="5px">
                {championship}
              </Heading>
              <Text>{values.description}</Text>
            </Box>
            <Flex w="100%" gap="10px" flexWrap="wrap">
              {values.matches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </Flex>
          </Box>
        ))}
      </Flex>
    );
  }
}
