import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // ← use this

import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import TwoByTwo from './screens/TwoByTwo';
import ThreeByThree from './screens/ThreeByThree';
import TwoByTwoPractice from './screens/TwoByTwoPractice';
import InverseMatricesCourse from './screens/InverseMatricesCourse';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#121825" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TwoByTwo" component={TwoByTwo} />
          <Stack.Screen name="ThreeByThree" component={ThreeByThree} />
          <Stack.Screen name="TwoByTwoPractice" component={TwoByTwoPractice} />
          <Stack.Screen name="InverseMatricesCourse" component={InverseMatricesCourse} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
