import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Screen_Details, Screen_Discover} from './screen';

const Stack = createStackNavigator();

/**
 */
const StackApp = () => {
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      })}>
      <Stack.Screen name="Discover" component={Screen_Discover} />
      <Stack.Screen name="Details" component={Screen_Details} />
    </Stack.Navigator>
  );
};

const AppNavigator = props => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <StackApp />
    </NavigationContainer>
  );
};
export default AppNavigator;
