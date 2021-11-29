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
  Platform,
} from 'react-native';
import {Search} from 'react-native-feather';
import {StationData} from '../api/chicago/getAllStations';
import {searchForStations} from '../api/chicago/searchForStations';
import Loading from '../components/Loading';
import StationColors from '../components/StationColors';
import {RootStackParamList} from '../navigation';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

type ItemProps = {
  data: StationData;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Search'>;
};

const SearchItem = ({data, navigation}: ItemProps) => {
  const [favorite, setFavorite] = useState("star-outline");
  return (
    <Pressable
      style={styles.item}
      onPress={() =>
        navigation.navigate('Station', {
          mapID: data.map_id,
          title: data.station_name,
        })
      }>
      <Icon name={favorite} size={20} color="#fcb103" style={styles.star} onPress={()=> {if (favorite === "star-outline") {setFavorite("star")} else {setFavorite("star-outline")}}}/>
      <View style={styles.itemTitleContainer}>
        <Text style={styles.title}>{data.station_name}</Text>
      </View>
      <StationColors station={data} />
    </Pressable>
  );
};

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
    <SearchItem data={item} navigation={navigation} />
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
    paddingRight:10,
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
