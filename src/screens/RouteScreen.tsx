import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItem,
  Platform,
} from 'react-native';
import {StationData} from '../api/chicago/getAllStations';
import {searchForStations} from '../api/chicago/searchForStations';
import Loading from '../components/Loading';
import {RootStackParamList} from '../navigation';
import StationItem from '../components/StationItem';
import {Colors} from '../styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Route'>;

const RouteScreen = ({navigation, route}: Props) => {
  const [searchData, setSearchData] = useState<StationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      const data = await searchForStations(route.params.route);
      setSearchData(
        data.sort((a, b) => {
          if (
            a.location.latitude + a.location.longitude >
            b.location.latitude + b.location.longitude
          ) {
            return -1;
          } else {
            return 1;
          }
        }),
      );
      setIsLoading(false);
    };

    navigation.setOptions({
      title: `${route.params.route} Line`,
      headerStyle: {
        backgroundColor: Colors.lines[route.params.route.toLowerCase()],
      },
      headerTintColor: route.params.route !== 'Yellow' ? 'white' : 'black',
    });
    handleSearch();
  }, []);

  const renderItem: ListRenderItem<StationData> = ({item}) => (
    <StationItem
      map_id={item.map_id}
      data={item}
      navigation={navigation}
      key={item.map_id}
    />
  );

  return (
    <View>
      {isLoading ? <Loading /> : <></>}
      <FlatList
        data={searchData}
        renderItem={renderItem}
        keyExtractor={item => item.stop_id}
        style={styles.searchList}
      />
    </View>
  );
};

export default RouteScreen;

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 16 : 4,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.25,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchList: {
    marginBottom: Platform.OS === 'ios' ? 32 : 0,
  },
  star: {
    paddingRight: 10,
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
  itemTitleContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {},
});
