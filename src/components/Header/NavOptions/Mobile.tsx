import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Link,
  Text
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Content from '../../../layouts/content';

import { Link as RouterLink } from 'react-router-dom';

interface MobileProps {
  title: string;
  description: string;
  children: ReactNode;
  baseboard: string;
  baseboardLink: string;
}

export default function Mobile({
  title,
  children,
  description,
  baseboard,
  baseboardLink
}: MobileProps) {
  return (
    <>
      <AccordionItem border="none">
        <AccordionButton>
          <Text fontWeight={600} as="span" flex="1" textAlign="left">
            {title}
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Content alignItems="left" my="15px" gap="5px">
            <Text mb="10px">{description}</Text>
            {children}
            <Link
              fontSize="sm"
              fontWeight="bold"
              as={RouterLink}
              to={baseboardLink}
            >
              {baseboard}
            </Link>
          </Content>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
