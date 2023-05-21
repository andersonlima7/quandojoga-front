import {
  Flex,
  IconButton,
  Image,
  useDisclosure,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import Logotipo from '/src/assets/logotipo.png';
import Menu from './Menu';
import { useMediaQuery } from '@chakra-ui/react';
import Content from '../../layouts/content';

export default function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isMobile] = useMediaQuery('(max-width: 380px)');
  const width = isMobile ? '370px' : '100%';

  const borderColor = useColorModeValue('gray.150', 'gray.850');
  return (
    <>
      <Flex
        bg="black"
        h="70px"
        as="header"
        justify="center"
        align="center"
        w={width}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Content flexDirection="row" justify="space-between" mt="0px" w={width}>
          <Link href="/">
            <Image src={Logotipo} w="160px" alt="Quandojoga.com" />
          </Link>
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
        </Content>
      </Flex>
      <Menu isOpen={isOpen} onClose={onClose} children={undefined} />
    </>
  );
}
