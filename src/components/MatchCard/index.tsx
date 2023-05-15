import {
  Card,
  CardBody,
  Divider,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  Box,
  Icon,
  chakra
} from '@chakra-ui/react';
import { CiLocationOn, CiPlay1 } from 'react-icons/ci';
import moment from 'moment';
import 'moment/dist/locale/pt-br';

interface MathCardProps {
  match: MatchType;
}

export default function MatchCard({ match }: MathCardProps) {
  // const myTeam = 'Bahia'; // TODO: Team context

  const date = moment(match.date, 'DD-MM-YYYY').locale('pt-br');

  const formattedDate = useBreakpointValue({
    sm: date.format('DD [de] MMM. [de] YYYY').toUpperCase(),
    base: date.format('DD/MM/YY').toUpperCase()
  });

  return (
    <CardContainer w={['100%', '28.125rem']}>
      <CardBody padding="10px">
        <Flex w="100%" flexDir="column" align="center" gap="5px">
          <Flex gap="20px" w="100%" justify="center">
            <TeamContainer>
              <Image src={match.team_home_logo} w="50px" />
              <TeamName>{match.team_home}</TeamName>
            </TeamContainer>
            <Flex flexDir="column" align="center" justify="center" w="150px">
              <Text fontWeight={400} textAlign="center">
                {formattedDate === 'DATA INVÁLIDA'
                  ? match.date.toUpperCase()
                  : formattedDate}
              </Text>
              <Text fontSize="1.25rem">{match.time}</Text>
            </Flex>
            <TeamContainer>
              <Image src={match.team_away_logo} w="50px" />
              <TeamName>{match.team_away}</TeamName>
            </TeamContainer>
          </Flex>
          <Box fontWeight={300}>
            <IconsContainer>
              <Icon as={CiPlay1} />
              <Text fontSize="sm">{match.tv.replaceAll(',', ' | ')}</Text>
            </IconsContainer>
            <IconsContainer>
              <Icon as={CiLocationOn} />
              <Text fontSize="sm">{match.location}</Text>
            </IconsContainer>
          </Box>
          <Divider mb="10px" />
        </Flex>
        <Flex justify="left" align="center" fontSize="sm" gap="5px">
          <Image src={match.championship_logo} boxSize="20px" />
          <Text>{match.championship.toUpperCase()}</Text>
        </Flex>
      </CardBody>
    </CardContainer>
  );
}

// Common styles
const CardContainer = chakra(Card, {
  baseStyle: {
    maxW: '28.125rem',
    minW: '21.125rem',
    fontSize: 'md'
  }
});
const TeamContainer = chakra(Flex, {
  baseStyle: {
    flexDir: 'column',
    alignItems: 'center',
    w: '100%',
    maxW: '6.875rem'
  }
});

const TeamName = chakra(Text, {
  baseStyle: {
    textAlign: 'center',
    fontWeight: 400,
    textTransform: 'uppercase'
  }
});

const IconsContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px'
  }
});
