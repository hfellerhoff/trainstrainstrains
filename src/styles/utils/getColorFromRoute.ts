import {TextStyle} from 'react-native';
import {Colors} from '../colors';

export const getColorFromRoute = (rt: string): TextStyle => {
  let color = Colors.lines.red;
  switch (rt.toLowerCase()) {
    case 'y':
      color = 'black';
      break;
    case 'red':
    case 'blue':
    case 'g':
    case 'brn':
    case 'p':
    case 'pexp':
    case 'pnk':
    case 'pink':
    case 'o':
    case 'org':
    default:
      color = 'white';
      break;
  }
  return {
    color,
  };
};
