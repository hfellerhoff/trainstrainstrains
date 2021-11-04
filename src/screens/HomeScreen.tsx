import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../components/core/Button';
import {RootStackParamList} from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Station View"
        onPress={() =>
          navigation.navigate('Station', {
            mapID: '40380',
            title: 'Clark/Lake',
          })
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
