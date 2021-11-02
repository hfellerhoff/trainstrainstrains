import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TestScreen from './src/screens/TestScreen';
import {RootStackParamList} from './src/navigation';
import StationScreen from './src/screens/StationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen 2" component={TestScreen} />
        <Stack.Screen name="Station" component={StationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
