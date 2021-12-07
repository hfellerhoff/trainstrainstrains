import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {RootStackParamList} from '../navigation';
import {Colors} from '../styles/colors';

type Props = {
  routeName: string;
  navigation: NativeStackScreenProps<
    RootStackParamList,
    keyof RootStackParamList
  >['navigation'];
};

const RouteItem = ({routeName, navigation}: Props) => {
  const backgroundStyle: ViewStyle = {
    backgroundColor: Colors.lines[routeName.toLowerCase()],
  };

  return (
    <Pressable
      style={[styles.route]}
      onPress={() =>
        navigation.navigate('Route', {
          route: routeName,
        })
      }>
      <View style={[styles.routeStrip, backgroundStyle]} />
      <Text style={styles.routeText}>{routeName}</Text>
    </Pressable>
  );
};

export default RouteItem;

const styles = StyleSheet.create({
  route: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.25,
    marginBottom: 0,
  },
  routeText: {
    fontWeight: 'bold',
    paddingVertical: 16,
    marginLeft: 11,
  },
  routeStrip: {
    width: 10,
    height: '100%',
  },
});
