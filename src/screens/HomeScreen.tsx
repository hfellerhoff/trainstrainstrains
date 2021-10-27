import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, View} from 'react-native';
import SampleFetch from '../components/SampleFetch';
import {RootStackParamList} from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <View>
      <Button
        title="Navigate to other screen"
        onPress={() => navigation.navigate('Screen 2')}
      />
      <SampleFetch />
    </View>
  );
};

export default HomeScreen;
