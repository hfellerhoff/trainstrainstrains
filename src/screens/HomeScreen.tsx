import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {RootStackParamList} from '../navigation';
import useFavorites from '../hooks/useFavorites';
import StationItem from '../components/StationItem';
import {Colors} from '../styles/colors';
import RouteItem from '../components/RouteItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const {favorites} = useFavorites({shouldSyncWithLocalStorage: true});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.listSectionText}>Favorites</Text>
      {Object.entries(favorites).map(([map_id]) => (
        <StationItem map_id={map_id} navigation={navigation} key={map_id} />
      ))}
      <View>
        <Text style={styles.listSectionText}>Pick by Route</Text>
      </View>

      <RouteItem routeName="Red" navigation={navigation} />
      <RouteItem routeName="Blue" navigation={navigation} />
      <RouteItem routeName="Brown" navigation={navigation} />
      <RouteItem routeName="Green" navigation={navigation} />
      <RouteItem routeName="Orange" navigation={navigation} />
      <RouteItem routeName="Pink" navigation={navigation} />
      <RouteItem routeName="Purple" navigation={navigation} />
      <RouteItem routeName="Yellow" navigation={navigation} />
    </ScrollView>
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
  sectionHeader: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  sectionHeaderText: {
    color: '#ffffff',
    fontSize: 18,
    padding: 16,
    fontWeight: 'bold',
  },
  routeSelect: {
    height: '15%',
    backgroundColor: 'purple',
  },
});
