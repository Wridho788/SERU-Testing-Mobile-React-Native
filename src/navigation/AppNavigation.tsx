import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterClaimScreen from "../screens/RegisterClaim/RegisterClaim";
import RegisterClaimPhoto from "../screens/RegisterClaimPhoto/RegisterClaimPhoto";

export type RootStackParamList = {
  RegisterClaimScreen: undefined;
  RegisterClaimPhoto: undefined;
  Third: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterClaimScreen">
        <Stack.Screen
          name="RegisterClaimScreen"
          component={RegisterClaimScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterClaimPhoto"
          component={RegisterClaimPhoto}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Third" component={ThirdScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
