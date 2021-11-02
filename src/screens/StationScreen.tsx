import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ArrivalData, getArrivalsByMapID} from '../api/cta/getArrivalsByMapID';
import ArrivalList from '../components/ArrivalList';
import {RootStackParamList} from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Station'>;

const StationScreen = ({route}: Props) => {
  const [arrivals, setArrivals] = useState<ArrivalData>();

  const updateArrivals = async () => {
    const arr = await getArrivalsByMapID(route.params.mapID);
    setArrivals(arr);
  };

  useEffect(() => {
    updateArrivals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ArrivalList arrivals={arrivals} onRefresh={updateArrivals} />
      {/* <Text>{JSON.stringify(arrivals, null, 2)}</Text> */}
    </View>
  );
};

export default StationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
});