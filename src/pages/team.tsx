import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Select,
  useColorModeValue
} from '@chakra-ui/react';
import Content from '../layouts/content';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import MatchesList from '../components/MatchesList';

/**
 * Team matches page.
 */
export default function Team() {
  const { name } = useParams();
  const [logo, setLogo] = useState('');
  const [championships, setChampionships] = useState([]);
  const [currentChampionship, setCurrentChampionship] = useState('');

  useEffect(() => {
    setCurrentChampionship('');
    const fetchTeam = async () => {
      try {
        const response = await api.get(`/teams/${name}`);
        const { data } = await response;
        setLogo(data.logo);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchChampionships = async () => {
      try {
        const response = await api.get(`/championship/teams/${name}`);
        const { data } = await response;

        const sortedData = data.sort();
        setChampionships(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeam();
    fetchChampionships();
  }, [name]);

  const color = useColorModeValue('gray.150', 'gray.850');

  return (
    <Flex w="100%" flexDir="column" align="center">
      <Content>
        <Flex
          align="left"
          w="100%"
          justify="center"
          flexDir="column"
          textTransform="uppercase"
        >
          <Flex align="center">
            <Box
              borderRadius="50%"
              border="1px solid"
              padding="3"
              borderColor={color}
              minW="fit-content"
            >
              <Image src={logo} alt={name} boxSize={['60px', '82px']} />
            </Box>
            <Box ml="3" mt="3">
              <Heading fontSize={['28', '48']} fontWeight="bold">
                {name}
              </Heading>
            </Box>
          </Flex>
        </Flex>
        <Divider w="calc(100vw - 15px)" bg={color} my="20px" h="1px" />
        <Flex flexDir="column" w="100%" gap="10px">
          <Heading fontSize="lg" my="30px">
            Próximos jogos
          </Heading>

          <Select
            maxW="450px"
            w="100%"
            onChange={e => setCurrentChampionship(e.target.value)}
            value={currentChampionship}
          >
            <option value="">Todas competições</option>
            {championships.map(champ => {
              return (
                <option key={champ} value={champ}>
                  {champ}
                </option>
              );
            })}
          </Select>
          <MatchesList
            searchKey={name ?? ''}
            orderBy="month"
            filter={{ prop: ['championship'], text: currentChampionship }}
            isTeamPage
          />
        </Flex>
      </Content>
    </Flex>
  );
}
