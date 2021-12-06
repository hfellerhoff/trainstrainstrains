import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {Favorites, favoritesAtom} from '../recoil/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteOptions {
  shouldSyncWithLocalStorage?: boolean;
}

const FAVORITES_LOCAL_STORAGE_KEY = '@favorites';

const useFavorites = (
  {shouldSyncWithLocalStorage = false}: FavoriteOptions = {
    shouldSyncWithLocalStorage: false,
  },
) => {
  const [favorites, setFavorites] = useRecoilState(favoritesAtom);
  const [isSettingFavorites, setIsSettingFavorites] = useState(false);

  useEffect(() => {
    const syncWithLocalStorage = async () => {
      try {
        const savedFavoritesString = await AsyncStorage.getItem(
          FAVORITES_LOCAL_STORAGE_KEY,
        );
        if (savedFavoritesString) {
          setFavorites(JSON.parse(savedFavoritesString) as Favorites);
        }
      } catch (e) {
        console.error(
          `Error fetching LocalStorage value ${FAVORITES_LOCAL_STORAGE_KEY}.`,
        );
      }
    };

    if (shouldSyncWithLocalStorage) {
      syncWithLocalStorage();
    }
  }, []);

  useEffect(() => {
    const setLocalStorageValues = async () => {
      try {
        const favoritesToSave = Object.entries(favorites).reduce(
          (acc, [map_id, isFavorited]) => {
            if (isFavorited) {
              acc[map_id] = true;
            }
            return acc;
          },
          {},
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
    };

    if (favorites) {
      setLocalStorageValues();
    }
  }, [favorites, setFavorites]);

  const addFavorite = (id: string) => {
    setIsSettingFavorites(true);
    setFavorites(f => ({...f, [id]: true}));
    setTimeout(() => setIsSettingFavorites(false), 500);
  };

  const removeFavorite = (id: string) => {
    setIsSettingFavorites(true);
    setFavorites(f => {
      delete f[id];
      return {...f};
    });
    setTimeout(() => setIsSettingFavorites(false), 500);
  };

  const toggleFavorite = (id: string) => {
    if (favorites[id]) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isSettingFavorites,
  };
};

export default useFavorites;
