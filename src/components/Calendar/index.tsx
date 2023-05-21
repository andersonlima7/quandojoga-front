import {
  Icon,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
  Text,
  Link,
  Flex
} from '@chakra-ui/react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { useToken } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';

interface CalendarProps {
  date: Moment;
  onDateChange: (date: any) => void;
}
/**
 * Simple match picker calendar
 */
export default function Calendar({ date, onDateChange }: CalendarProps) {
  // Get light and dark hex colors.
  const [light, dark] = useToken('colors', ['white', 'gray.850']);
  const navigate = useNavigate();
  // toggle between light and dark theme
  const colorHex = useColorModeValue(light, dark);
  const root = document.documentElement;
  root.style.setProperty('--default-theme', colorHex);

  const handleDateChange = (date: any) => {
    const momentDate = moment(date); // Converte para um objeto moment
    onDateChange(momentDate);
    navigate(`/?date=${momentDate.format('DD-MM-YY')}`);
    // window.location.href = `/${momentDate.format('DD-MM-YY')}`;
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button bg="transparent">
          <Icon mr="5px" as={IoCalendarNumberSharp} boxSize="22px" />
          <Text display={['none', 'block']} fontWeight={500}>
            Calendário
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent margin="0 10px" bg={colorHex}>
        <Flex flexDirection="column" align="center">
          <PopoverArrow />
          <ReactCalendar
            onChange={handleDateChange}
            value={date.toDate()}
            minDate={new Date()}
            next2Label={null}
            prev2Label={null}
          />
          <Link href="/" _hover={{}} w="100%">
            <Button borderRadius="0px" w="100%">
              Hoje
            </Button>
          </Link>
        </Flex>
      </PopoverContent>
    </Popover>
  );
}
