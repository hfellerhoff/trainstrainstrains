import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RootStackParamList} from '../navigation';
import useFavorites from '../hooks/useFavorites';
import StationItem from '../components/StationItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const {favorites} = useFavorites({shouldSyncWithLocalStorage: true});

  return (
    <View style={styles.container}>
      {/* <Button
        title="Go to Station View"
        onPress={() =>
          navigation.navigate('Station', {
            mapID: '40380',
            title: 'Clark/Lake',
          })
        }
      /> */}
      <Text style={styles.listSectionText}>Favorites</Text>
      {Object.entries(favorites).map(([map_id]) => (
        <StationItem map_id={map_id} navigation={navigation} key={map_id} />
      ))}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  loadingView: {
    padding: 32,
  },
  list: {
    height: '100%',
  },
  listSection: {
    backgroundColor: '#F2F2F2',
  },
  listSectionText: {
    fontSize: 18,
    padding: 16,
  },
  star: {
    paddingRight: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,

    backgroundColor: 'gray',
  },
  listItemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
