import React, {useState} from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
} from 'react-native';
import Button from './core/Button';
import {getArrivalsByMapID} from '../api/cta/getArrivalsByMapID';

const SampleFetch = () => {
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    try {
      setData(await getArrivalsByMapID('41300')); // loyola's station to dan ryan
    } catch (error) {
      console.error(error);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button title="Fetch Data" onPress={fetchData} />
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SampleFetch;
