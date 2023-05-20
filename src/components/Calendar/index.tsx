import { useState } from 'react';
import {
  Icon,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
  Text
} from '@chakra-ui/react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { useToken } from '@chakra-ui/react';

/**
 * Simple match picker calendar
 */
export default function Calendar() {
  const [value, setValue] = useState(new Date());

  const onChange = (newValue: any) => {
    setValue(newValue);
  };

  // Get light and dark hex colors.
  const [light, dark] = useToken('colors', ['white', 'gray.850']);
  // toggle between light and dark theme
  const colorHex = useColorModeValue(light, dark);
  const root = document.documentElement;
  root.style.setProperty('--default-theme', colorHex);

  return (
    <Popover>
      <PopoverTrigger>
        <Button bg="transparent">
          <Icon mr="5px" as={BsFillCalendarDateFill} boxSize="22px" />
          <Text display={['none', 'block']} fontWeight={500}>
            Calendário
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent margin="0 10px">
        <PopoverArrow />
        <ReactCalendar
          onChange={e => onChange(e)}
          value={value}
          minDate={new Date()}
          next2Label={null}
          prev2Label={null}
        />
      </PopoverContent>
    </Popover>
  );
}
