import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import useFavorites from '../hooks/useFavorites';
import Icon from 'react-native-vector-icons/Ionicons';
import StationColors from './StationColors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation';
import {StationData} from '../api/chicago/getAllStations';
import {getStationByMapID} from '../api/chicago/getStationByMapID';

type ItemProps = {
  map_id: string;
  data?: StationData;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
};
const StationItem = ({data, map_id, navigation}: ItemProps) => {
  const {favorites, toggleFavorite, isSettingFavorites} = useFavorites();
  const [stationData, setStationData] = useState<StationData | null>(
    data || null,
  );

  useEffect(() => {
    const updateStationData = async () => {
      const stationResponse = await getStationByMapID(map_id);
      if (stationResponse) {
        setStationData(stationResponse);
      }
    };
    if (!stationData) {
      updateStationData();
    }
  }, [map_id, stationData]);

  if (!stationData) {
    return (
      <View style={styles.item}>
        <View>
          <View style={styles.itemTitleContainer}>
            <Text>Loading favorited station data...</Text>
          </View>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  const isFavorited = !!favorites[stationData.map_id];

  const handleFavoriteToggle = () => {
    toggleFavorite(stationData.map_id);
  };

  return (
    <View style={styles.item}>
      {isSettingFavorites ? (
        <ActivityIndicator style={styles.star} />
      ) : (
        <Icon
          name={isFavorited ? 'star' : 'star-outline'}
          size={20}
          color="#ffc800"
          style={styles.star}
          onPress={handleFavoriteToggle}
        />
      )}
      <Pressable
        style={styles.itemPressable}
        onPress={() =>
          navigation.navigate('Station', {
            mapID: stationData.map_id,
            title: stationData.station_name,
          })
        }>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.title}>{stationData.station_name}</Text>
        </View>
        <StationColors station={stationData} />
      </Pressable>
    </View>
  );
};

export default StationItem;

const styles = StyleSheet.create({
  star: {
    paddingRight: 16,
  },
  item: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.25,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  itemPressable: {
    flexDirection: 'row',
    flex: 1,
  },
  itemTitleContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {},
});
