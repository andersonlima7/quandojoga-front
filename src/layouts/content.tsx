import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ContentProps extends FlexProps {
  children: ReactNode;
}
/**
 * Default content layout for every page and header.
 */
export default function Content({ children, ...props }: ContentProps) {
  return (
    <Flex
      w="100%"
      maxW="1300px"
      flexDirection={props.flexDirection ?? 'column'}
      align="center"
      justify="center"
      padding="0px 10px"
      mt={props.mt ?? '40px'}
      {...props}
    >
      {children}
    </Flex>
  );
}
