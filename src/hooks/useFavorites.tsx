import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {
  Favorites,
  favoritesAtom,
  FAVORITES_LOCAL_STORAGE_KEY,
} from '../recoil/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteOptions {
  shouldSyncWithLocalStorage?: boolean;
}

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

  const addFavorite = (id: string) => {
    setIsSettingFavorites(true);
    setFavorites(f => ({...f, [id]: true}));
    setTimeout(() => setIsSettingFavorites(false), 500);
  };

  const removeFavorite = (id: string) => {
    setIsSettingFavorites(true);
    setFavorites(f => {
      return Object.entries(f).reduce((acc, [itemID]) => {
        if (itemID !== id) {
          acc[itemID] = true;
        }
        return acc;
      }, {} as Favorites);
    });
    setIsSettingFavorites(false);
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
