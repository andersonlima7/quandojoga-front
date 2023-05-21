import { Flex, IconButton, Image, useDisclosure } from '@chakra-ui/react';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import Logotipo from '/src/assets/logotipo.png';
import Menu from './Menu';
import { useMediaQuery } from '@chakra-ui/react';

export default function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isMobile] = useMediaQuery('(max-width: 380px)');
  const width = isMobile ? '400px' : '100%';
  return (
    <>
      <Flex
        as="header"
        w={width}
        position="sticky"
        h="70px"
        justify="space-between"
        alignItems="center"
        bg="black"
        padding="0 10px"
      >
        <Image src={Logotipo} w="160px" />
        <IconButton
          icon={isOpen ? <RxCross1 /> : <RxHamburgerMenu />}
          bg="transparent"
          color="primary.500"
          fontSize="25px"
          transition="all 0.5s"
          onClick={onOpen}
          _hover={{ bg: 'transparent' }}
          transform={isOpen ? 'rotate(90deg)' : 'none'}
          aria-label="Menu button toggle"
        />
      </Flex>
      <Menu isOpen={isOpen} onClose={onClose} children={undefined} />
    </>
  );
}
