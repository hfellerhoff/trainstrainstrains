import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StationData} from '../api/chicago/getAllStations';
import {Colors} from '../styles/colors';

interface Props {
  station: StationData;
}

interface StripProps {
  exists: boolean;
  color: string;
}

const StationColorStrip = ({exists, color}: StripProps) => {
  if (!exists) {
    return <></>;
  }
  return <View style={[styles.stripe, {backgroundColor: color}]} />;
};

const StationColors = ({station}: Props) => {
  return (
    <View style={styles.container}>
      <StationColorStrip exists={station.red} color={Colors.lines.red} />
      <StationColorStrip exists={station.blue} color={Colors.lines.blue} />
      <StationColorStrip
        exists={station.p || station.pexp}
        color={Colors.lines.purple}
      />
      <StationColorStrip exists={station.y} color={Colors.lines.yellow} />
      <StationColorStrip exists={station.g} color={Colors.lines.green} />
      <StationColorStrip exists={station.o} color={Colors.lines.orange} />
      <StationColorStrip exists={station.brn} color={Colors.lines.brown} />
      <StationColorStrip exists={station.pnk} color={Colors.lines.pink} />
    </View>
  );
};

export default StationColors;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripe: {
    height: 10,
    width: 10,
    borderRadius: 50,
    marginLeft: 5,
  },
});
