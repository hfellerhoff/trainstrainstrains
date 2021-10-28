import React, {useState} from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
  Text,
} from 'react-native';
import {getTrainsByRoute} from '../api/cta/getTrainsByRoute';

const SampleFetch = () => {
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    try {
      setData(await getTrainsByRoute('Red')); // loyola's station to dan ryan
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
