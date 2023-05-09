import { useColorMode, IconButton } from '@chakra-ui/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
      onClick={toggleColorMode}
      aria-label="Toggle theme button"
      w="40px"
      bg="transparent"
      fontSize="30px"
    />
  );
}
