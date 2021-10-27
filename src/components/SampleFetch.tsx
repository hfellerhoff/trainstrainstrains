import React, {useState} from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
  Text,
} from 'react-native';
import {
  ArrivalData,
  getArrivalsByStation,
} from '../api/cta/getArrivalsByStation';

const SampleFetch = () => {
  const [arrivals, setArrivals] = useState<ArrivalData>();

  const fetchData = async () => {
    try {
      setArrivals(await getArrivalsByStation(41300)); // loyola's station to dan ryan
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
        <Text>{JSON.stringify(arrivals, null, 2)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SampleFetch;
