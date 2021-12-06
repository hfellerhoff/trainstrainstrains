import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  ListRenderItem,
  Platform,
} from 'react-native';
import {Search} from 'react-native-feather';
import {StationData} from '../api/chicago/getAllStations';
import {searchForStations} from '../api/chicago/searchForStations';
import Loading from '../components/Loading';
import {RootStackParamList} from '../navigation';
import StationItem from '../components/StationItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen = ({navigation}: Props) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState<StationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const data = await searchForStations(searchInput);
    setSearchData(data);
    setIsLoading(false);
  };

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
      <View style={styles.searchInput}>
        <Search
          color="black"
          width={18}
          height={18}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Red Line, Lake, Howard..."
          returnKeyType="search"
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
          autoCorrect={false}
          autoFocus
        />
      </View>
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

export default SearchScreen;

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
    marginBottom: 80,
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
