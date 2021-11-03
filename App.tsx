import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TestScreen from './src/screens/TestScreen';
import {RootStackParamList} from './src/navigation';
import StationScreen from './src/screens/StationScreen';
import Button from './src/components/core/Button';
import {Search} from 'react-native-feather';
import {StyleSheet} from 'react-native';
import SearchScreen from './src/screens/SearchScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Search')}
                variant="ghost"
                style={styles.searchButton}>
                <Search color="black" width={24} height={24} />
              </Button>
            ),
            title: 'Trains Trains Trains',
          })}
        />
        <Stack.Screen name="Screen 2" component={TestScreen} />
        <Stack.Screen name="Station" component={StationScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    width: '100%',
    marginHorizontal: 8,
    padding: 8,
  },
  searchButton: {
    padding: 4,
    margin: 0,
  },
});
