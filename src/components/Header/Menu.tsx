import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerProps,
  Flex
} from '@chakra-ui/react';
import ToggleTheme from './ToggleTheme';
import NavOptions from './NavOptions';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Mobile menu
 */
export default function Menu({ isOpen, onClose }: DrawerProps) {
  const location = useLocation();
  useEffect(() => {
    onClose();
  }, [location.pathname]);
  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen} isFullHeight>
      <DrawerContent mt="70px">
        <DrawerBody
          as={Flex}
          flexDir="column"
          gap="35px"
          fontFamily="Montserrat"
          fontWeight={700}
          mt="30px"
        >
          <NavOptions />
          <ToggleTheme />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
