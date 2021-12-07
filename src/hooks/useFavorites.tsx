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

  const setLocalStorageValues = async (values: Favorites) => {
    try {
      const favoritesToSave = Object.entries(values).reduce(
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
  };

  const addFavorite = (id: string) => {
    setIsSettingFavorites(true);
    setFavorites(f => {
      const newFavorites = {...f, [id]: true};
      setLocalStorageValues(newFavorites);
      return newFavorites;
    });
    setTimeout(() => setIsSettingFavorites(false), 500);
  };

  const removeFavorite = (id: string) => {
    setIsSettingFavorites(true);
    setFavorites(f => {
      const filteredFavorites = Object.entries(f).reduce((acc, [itemID]) => {
        if (itemID !== id) {
          acc[itemID] = true;
        }
        return acc;
      }, {} as Favorites);
      setLocalStorageValues(filteredFavorites);
      return filteredFavorites;
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
