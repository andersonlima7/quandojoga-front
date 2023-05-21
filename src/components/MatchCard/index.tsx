import {
  Card,
  CardBody,
  Divider,
  Flex,
  Image,
  Text,
  Box,
  Icon,
  chakra,
  useBreakpointValue
} from '@chakra-ui/react';
import { CiLocationOn, CiPlay1 } from 'react-icons/ci';
import moment from 'moment';
import 'moment/dist/locale/pt-br';

interface MathCardProps {
  match: MatchType;
  teamPage?: boolean;
}

export default function MatchCard({ match, teamPage = false }: MathCardProps) {
  // const myTeam = 'Bahia'; // TODO: Team context

  const date = moment(match.date, 'DD-MM-YYYY').locale('pt-br');
  const currentDate = moment();
  const weeksDiff = date.diff(currentDate, 'weeks');

  const formattedDate =
    weeksDiff <= 2
      ? date.format('ddd[.], DD/MM/YY').toUpperCase()
      : date.format('DD/MM/YYYY');

  return (
    <CardContainer w="inherit">
      <CardBody padding="10px">
        <Flex
          w="100%"
          flexDir="column"
          align="center"
          gap="5px"
          justify="space-between"
        >
          <Flex gap="20px" w="100%" justify="center">
            <TeamContainer>
              <Image src={match.team_home_logo} w="50px" />
              <TeamName>{match.team_home}</TeamName>
            </TeamContainer>
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              w={['50px', '150px']}
            >
              <Text
                fontWeight={400}
                textAlign="center"
                fontSize={['smm', 'smm', 'md']}
                display={teamPage ? 'block' : 'none'}
              >
                {formattedDate === 'DATA INVÁLIDA'
                  ? match.date.toUpperCase()
                  : formattedDate}
              </Text>
              <Text fontSize={['sm', 'mdd']}>{match.time}</Text>
            </Flex>
            <TeamContainer>
              <Image src={match.team_away_logo} w="50px" />
              <TeamName>{match.team_away}</TeamName>
            </TeamContainer>
          </Flex>
          <Box fontWeight={300}>
            {match.tv ? (
              <IconsContainer>
                <Icon as={CiPlay1} />
                <IconsText>{match.tv.replaceAll(',', ' | ')}</IconsText>
              </IconsContainer>
            ) : (
              <Box mb="21px" />
            )}
            <IconsContainer>
              <Icon as={CiLocationOn} />
              <IconsText>{match.location}</IconsText>
            </IconsContainer>
          </Box>
        </Flex>

        {teamPage && (
          <>
            <Divider mb="10px" />
            <Flex w="100%" justify="space-between" align="center">
              <Flex justify="left" align="center" fontSize="sm" gap="5px">
                <Image src={match.championship_logo} boxSize="20px" />
                <Text>{match.championship.toUpperCase()}</Text>
              </Flex>
              <Text fontSize="10px">{match.description.toUpperCase()}</Text>
            </Flex>
          </>
        )}
      </CardBody>
    </CardContainer>
  );
}

// Common styles
const CardContainer = chakra(Card, {
  baseStyle: {
    maxW: { sm: '100%', md: '420px' },
    minW: '344px',
    fontSize: 'md'
  }
});
const TeamContainer = chakra(Flex, {
  baseStyle: {
    flexDir: 'column',
    alignItems: 'center',
    w: '100%',
    gap: '5px',
    maxW: ['127px', '178px']
  }
});

const TeamName = chakra(Text, {
  baseStyle: {
    textAlign: 'center',
    fontWeight: 400,
    textTransform: 'uppercase',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    maxW: { base: '127px', lg: '160px' },
    overflow: 'hidden' /* Oculta o conteúdo excedente */,
    textOverflow: 'ellipsis' /* Corta o texto e exibe reticências no final */
  }
});

const IconsContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px'
  }
});

const IconsText = chakra(Text, {
  baseStyle: {
    fontSize: 'sm',
    fontWeight: 'light'
  }
});
