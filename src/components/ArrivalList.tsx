import dayjs from 'dayjs';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  DefaultSectionT,
  ListRenderItem,
  RefreshControl,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ArrivalData, ArrivalDataETA} from '../api/cta/getArrivalsByMapID';
import {getFullRouteName} from '../api/util/getFullRouteName';
import {getBackgroundFromRoute} from '../styles/utils/getBackgroundFromRoute';

interface Props {
  arrivals: ArrivalData | undefined;
  onRefresh: () => Promise<void>;
}

type ItemProps = {
  eta: ArrivalDataETA;
};
const ArrivalListItem = ({eta}: ItemProps) => {
  const now = dayjs();
  const arrivalTime = dayjs(eta.arrT);
  const minutesUntil = arrivalTime.diff(now, 'm');

  const timeUntilText =
    minutesUntil < 0
      ? `Late ${-minutesUntil} min`
      : minutesUntil === 0
      ? 'Due'
      : `${minutesUntil} min`;

  return (
    <View style={[styles.listItem, getBackgroundFromRoute(eta.rt)]}>
      <Text style={styles.listItemText}>{eta.destNm}</Text>
      <Text style={styles.listItemText}>{timeUntilText}</Text>
    </View>
  );
};

const ArrivalList = ({arrivals, onRefresh}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderItem: ListRenderItem<ArrivalDataETA> = ({item}) => (
    <ArrivalListItem eta={item as ArrivalDataETA} />
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  if (!arrivals) {
    return <ActivityIndicator />;
  }

  function getSections(
    arr: any[],
  ): SectionListData<ArrivalDataETA, DefaultSectionT>[] {
    // Group arrivals on the same route together
    const property = 'rt';
    const unparsedSectionsJSON = arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});

    const unparsedSections: ArrivalDataETA[][] =
      Object.values(unparsedSectionsJSON);

    if (unparsedSections.length === 1) {
      return unparsedSections.map(section => {
        return {
          title: '',
          data: section,
        };
      });
    } else {
      return unparsedSections.map(section => {
        return {
          title: getFullRouteName(section[0].rt),
          data: section,
        };
      });
    }
  }

  return (
    <SectionList
      style={styles.list}
      sections={getSections(arrivals.eta)}
      renderItem={renderItem}
      keyExtractor={item => `${item.arrT}-${item.rn}`}
      renderSectionHeader={({section: {title}}) => (
        <>
          {title ? (
            <View style={styles.listSection}>
              <Text style={styles.listSectionText}>{title}</Text>
            </View>
          ) : (
            <></>
          )}
        </>
      )}
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
  listSection: {
    backgroundColor: '#F2F2F2',
  },
  listSectionText: {
    fontSize: 18,
    padding: 16,
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
