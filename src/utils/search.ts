import { removeAccents } from './removeAccents';

export const searchInto = (
  matches: any[],
  props: string[],
  filterText: string
) => {
  return matches?.filter(match => {
    return props.some(prop => {
      return (
        match[prop] &&
        removeAccents(match[prop].toString().toLowerCase()).includes(
          removeAccents(filterText.toLowerCase())
        )
      );
    });
  });
};
