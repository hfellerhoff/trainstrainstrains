import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  ListRenderItem,
} from 'react-native';
import {StationData} from '../api/chicago/getAllStations';
import {searchForStations} from '../api/chicago/searchForStations';
import {RootStackParamList} from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

type ItemProps = {
  data: StationData;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Search'>;
};
const SearchItem = ({data, navigation}: ItemProps) => {
  return (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate('Station', {
          mapID: data.map_id,
          title: data.station_name,
        })
      }>
      <Text style={styles.title}>{data.station_descriptive_name}</Text>
    </Pressable>
  );
};

const SearchScreen = ({navigation}: Props) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState<StationData[]>([]);

  const handleSearch = async () => {
    const data = await searchForStations(searchInput);
    setSearchData(data);
  };

  const renderItem: ListRenderItem<StationData> = ({item}) => (
    <SearchItem data={item} navigation={navigation} />
  );

  return (
    <View>
      <TextInput
        placeholder="Red Line, Lake, Howard..."
        style={styles.searchInput}
        returnKeyType="search"
        value={searchInput}
        onChangeText={setSearchInput}
        autoFocus
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchData}
        renderItem={renderItem}
        keyExtractor={item => item.stop_id}
        style={styles.searchList}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchInput: {
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.25,
  },
  searchList: {
    marginBottom: 80,
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.25,
    marginBottom: 0.25,
  },
  title: {},
});
