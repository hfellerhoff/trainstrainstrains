export const getFullRouteName = (rt: string): string => {
  switch (rt.toLowerCase()) {
    case 'red':
      return 'Red';
    case 'blue':
      return 'Blue';
    case 'g':
      return 'Green';
    case 'brn':
      return 'Brown';
    case 'p':
      return 'Purple';
    case 'pexp':
      return 'Purple (express)';
    case 'y':
      return 'Yellow';
    case 'pnk':
    case 'pink':
      return 'Pink';
    case 'o':
    case 'org':
      return 'Orange';
    default:
      return 'Red';
  }
};
