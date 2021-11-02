import dayjs from 'dayjs';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ArrivalData, ArrivalDataETA} from '../api/cta/getArrivalsByMapID';
import {getBackgroundFromRoute} from '../styles/utils/getBackgroundFromRoute';

interface Props {
  arrivals: ArrivalData | undefined;
  onRefresh: () => Promise<void>;
}

type ItemProps = {
  eta: ArrivalDataETA;
  now: dayjs.Dayjs;
};
const ArrivalListItem = ({eta, now}: ItemProps) => {
  const arrivalTime = dayjs(eta.arrT);
  const minutesUntil = arrivalTime.diff(now, 'm');

  const timeUntilText = minutesUntil === 0 ? 'Due' : `${minutesUntil} min`;

  return (
    <View style={[styles.listItem, getBackgroundFromRoute(eta.rt)]}>
      <Text style={styles.listItemText}>{eta.destNm}</Text>
      <Text style={styles.listItemText}>{timeUntilText}</Text>
    </View>
  );
};

const ArrivalList = ({arrivals, onRefresh}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const now = dayjs();
  const renderItem: ListRenderItem<ArrivalDataETA> = ({item}) => (
    <ArrivalListItem eta={item as ArrivalDataETA} now={now} />
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  if (!arrivals) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      style={styles.list}
      data={arrivals.eta}
      renderItem={renderItem}
      keyExtractor={item => item.rn}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export default ArrivalList;

const styles = StyleSheet.create({
  list: {
    height: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  listItemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
