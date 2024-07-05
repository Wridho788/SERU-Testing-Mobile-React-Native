import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterClaimScreen from './screens/RegisterClaim/RegisterClaim';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RegisterClaim"
        screenOptions={{ headerShown: false }}  // Hide the header
      >
        <Stack.Screen name="RegisterClaim" component={RegisterClaimScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
