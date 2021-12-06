import {atom} from 'recoil';

// Array of map_id[]
export type Favorites = Record<string, boolean>;

export const favoritesAtom = atom<Favorites>({
  key: 'favorites',
  default: {},
});
