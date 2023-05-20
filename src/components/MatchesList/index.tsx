import { Flex } from '@chakra-ui/react';
import { Moment } from 'moment';
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

  return (
    <Flex flexWrap="wrap" w="100%" gap="10px">
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </Flex>
  );
}
