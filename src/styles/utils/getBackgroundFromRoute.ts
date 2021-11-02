import {ViewStyle} from 'react-native';
import {Colors} from '../colors';

export const getBackgroundFromRoute = (rt: string): ViewStyle => {
  let color = Colors.lines.red;
  console.log(rt);
  switch (rt.toLowerCase()) {
    case 'red':
      color = Colors.lines.red;
      break;
    case 'blue':
      color = Colors.lines.blue;
      break;
    case 'g':
      color = Colors.lines.green;
      break;
    case 'brn':
      color = Colors.lines.brown;
      break;
    case 'p':
    case 'pexp':
      color = Colors.lines.purple;
      break;
    case 'y':
      color = Colors.lines.yellow;
      break;
    case 'pnk':
    case 'pink':
      color = Colors.lines.pink;
      break;
    case 'o':
    case 'org':
      color = Colors.lines.orange;
      break;
    default:
      color = Colors.lines.red;
      break;
  }
  return {
    backgroundColor: color,
  };
};
