import {
  Flex,
  IconButton,
  Image,
  useDisclosure,
  Link,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import Logotipo from '/src/assets/logotipo.png';
import Menu from './Menu';
import { useMediaQuery } from '@chakra-ui/react';
import Content from '../../layouts/content';
import ToggleTheme from './ToggleTheme';
import NavOptions from './NavOptions';

export default function Header() {
  const {
    isOpen: MenuIsOpen,
    onClose: MenuOnClose,
    onOpen: MenuOnOpen
  } = useDisclosure();

  const [overflowed] = useMediaQuery('(max-width: 380px)');
  const width = overflowed ? '370px' : '100%';

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false
  });

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
        <Content
          flexDirection="row"
          justify={isMobile ? 'space-between' : 'left'}
          mt="0px"
          w={width}
          color="whiteAlpha.900"
        >
          <Link href="/">
            <Image src={Logotipo} w="160px" alt="Quandojoga.com" />
          </Link>

          {isMobile && (
            <IconButton
              icon={MenuIsOpen ? <RxCross1 /> : <RxHamburgerMenu />}
              bg="transparent"
              color="primary.500"
              fontSize="25px"
              transition="all 0.5s"
              onClick={MenuOnOpen}
              _hover={{ bg: 'transparent' }}
              transform={MenuIsOpen ? 'rotate(90deg)' : 'none'}
              aria-label="Menu button toggle"
            />
          )}

          {!isMobile && (
            <Flex as="nav" gap="15px" align="center" ml="50px" w="100%">
              <NavOptions />
              <ToggleTheme />
            </Flex>
          )}
        </Content>
      </Flex>

      {isMobile && (
        <Menu isOpen={MenuIsOpen} onClose={MenuOnClose} children={undefined} />
      )}
    </>
  );
}
