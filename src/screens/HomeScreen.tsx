import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import { atom, useRecoilState } from 'recoil';
import {Text, StyleSheet, View} from 'react-native';
import {getBackgroundFromRoute} from '../styles/utils/getBackgroundFromRoute';
import {getColorFromRoute} from '../styles/utils/getColorFromRoute';
import Button from '../components/core/Button';
import {RootStackParamList} from '../navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {favorites as favoritesAtom} from '../recoil/atoms';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const [faves, setFaves] = useRecoilState(favoritesAtom);
  return (
    <View style={styles.container}>
      <Button
        title="Go to Station View"
        onPress={() =>
          navigation.navigate('Station', {
            mapID: '40380',
            title: 'Clark/Lake',
          })
        }
      />
        {faves.map((fave) => (
          <View style={[styles.listItem, backgroundStyle]}>
          <Icon name={'star'} size={20} color="#ffdb38" style={styles.star} 
            onPress={()=> {
              if (favorite === "star-outline") {
                setFavorite("star") 
              } else {
                setFavorite("star-outline")
              }
            }}
          />
          <Text style={[styles.listItemText, textStyle]}>{eta.destNm}</Text>
          <Text style={[styles.listItemText, textStyle]}>{timeUntilText}</Text>
        </View>
        ))}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
    paddingRight:10,
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
