import { ReactNode } from 'react';
import {
  Text,
  Grid,
  Menu,
  MenuButton,
  Button,
  MenuList,
  useColorModeValue,
  Link
} from '@chakra-ui/react';
import Content from '../../../layouts/content';
import { Link as RouterLink } from 'react-router-dom';

interface DesktopProps {
  title: string;
  description: string;
  children: ReactNode;
  baseboard: string;
  baseboardLink: string;
}
export default function Desktop({
  title,
  children,
  description,
  baseboard,
  baseboardLink
}: DesktopProps) {
  const color = useColorModeValue('black', 'white');
  const bg = useColorModeValue('gray.100', 'gray.950');
  return (
    <Menu variant="primary">
      <MenuButton as={Button} bg="transparent" _hover={{}} _active={{}}>
        {title}
      </MenuButton>
      <MenuList
        w="calc(100vw - 15px)"
        display="flex"
        justifyContent="center"
        borderRadius="0px"
        color={color}
        bg={bg}
      >
        <Content alignItems="left" my="15px">
          <Text mb="15px">{description}</Text>
          <Grid
            rowGap="15px"
            templateColumns="repeat(5, 1fr)"
            templateRows="repeat(4, 1fr)"
            columnGap="5px"
          >
            {children}
          </Grid>
          <Link
            fontSize="sm"
            fontWeight="bold"
            as={RouterLink}
            to={baseboardLink}
            my={5}
          >
            {baseboard}
          </Link>
        </Content>
      </MenuList>
    </Menu>
  );
}
