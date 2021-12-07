import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {
  ArrivalDataETA,
  getArrivalsByMapID,
} from '../api/cta/getArrivalsByMapID';
import useFavorites from '../hooks/useFavorites';
import {getBackgroundFromRoute} from '../styles/utils/getBackgroundFromRoute';
import {getColorFromRoute} from '../styles/utils/getColorFromRoute';
import Icon from 'react-native-vector-icons/Ionicons';

type ItemProps = {
  eta: ArrivalDataETA;
};
const ArrivalItem = ({eta}: ItemProps) => {
  const now = dayjs();
  const arrivalTime = dayjs(eta.arrT);
  const minutesUntil = arrivalTime.diff(now, 'm');

  const timeUntilText =
    minutesUntil < 0
      ? `Late ${-minutesUntil} min`
      : minutesUntil === 0
      ? 'Due'
      : `${minutesUntil} min`;

  const backgroundStyle = getBackgroundFromRoute(eta.rt);
  const textStyle = getColorFromRoute(eta.rt);

  return (
    <View style={[styles.listItem, backgroundStyle]}>
      <Text style={[styles.listItemText, styles.destinationText, textStyle]}>
        {eta.destNm}
      </Text>
      <Text style={[styles.listItemText, textStyle]}>{timeUntilText}</Text>
    </View>
  );
};

export default ArrivalItem;

const styles = StyleSheet.create({
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
    paddingRight: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    padding: 16,
  },
  listItemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  destinationText: {
    flex: 1,
  },
});
