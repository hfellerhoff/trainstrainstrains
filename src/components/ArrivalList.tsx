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
import ArrivalItem from './ArrivalItem';

interface Props {
  arrivals: ArrivalData | undefined;
  onRefresh: () => Promise<void>;
}

const ArrivalList = ({arrivals, onRefresh}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderItem: ListRenderItem<ArrivalDataETA> = ({item}) => (
    <ArrivalItem eta={item as ArrivalDataETA} key={item.arrT} />
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  if (!arrivals) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator />
      </View>
    );
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
    paddingRight: 10,
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
