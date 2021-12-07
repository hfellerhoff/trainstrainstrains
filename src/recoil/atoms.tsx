import AsyncStorage from '@react-native-async-storage/async-storage';

import {atom} from 'recoil';

// Array of map_id[]
export type Favorites = Record<string, boolean>;

export const FAVORITES_LOCAL_STORAGE_KEY = '@favorites';

export const favoritesAtom = atom<Favorites>({
  key: 'favorites',
  default: {},
  effects_UNSTABLE: [
    ({onSet}) => {
      onSet(async favorites => {
        try {
          const favoritesToSave = Object.entries(favorites).reduce(
            (acc, [map_id, isFavorited]) => {
              if (isFavorited) {
                acc[map_id] = true;
              }
              return acc;
            },
            {} as Favorites,
          );
          await AsyncStorage.setItem(
            FAVORITES_LOCAL_STORAGE_KEY,
            JSON.stringify(favoritesToSave),
          );
        } catch (e) {
          console.error(
            `Error setting LocalStorage value ${FAVORITES_LOCAL_STORAGE_KEY}.`,
          );
        }
      });
    },
  ],
});
