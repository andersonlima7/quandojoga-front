import { Flex, Icon, Image } from '@chakra-ui/react';

import { RxHamburgerMenu } from 'react-icons/rx';

import Logotipo from '/src/assets/logotipo.png';

export default function Header() {
  return (
    <Flex as="header" w="100%" h="60px" justify="space-between" bg="black">
      <Image src={Logotipo} objectFit="cover" />
      <Icon as={RxHamburgerMenu} color="primary.500" />
    </Flex>
  );
}
