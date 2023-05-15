import { Flex, IconButton, Image, useDisclosure } from '@chakra-ui/react';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import Logotipo from '/src/assets/logotipo.png';
import Menu from './Menu';

export default function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Flex
        as="header"
        w="100%"
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
