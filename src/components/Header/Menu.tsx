import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerProps,
  Text,
  Flex
} from '@chakra-ui/react';
import ToggleTheme from './ToggleTheme';

/**
 * Mobile menu
 */
export default function Menu({ isOpen, onClose }: DrawerProps) {
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
          <Text>MEU TIME</Text>
          <Text>TIMES</Text>
          <Text>CAMPEONATOS</Text>
          <Text>JOGOS DE HOJE</Text>
          <ToggleTheme />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
