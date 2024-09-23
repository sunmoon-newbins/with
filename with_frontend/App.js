import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigations/MainStackNavigator"; // 경로에 맞게 import

import BottomTabNavigator from "./src/navigations/BottomTabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* <MainStackNavigator /> */}
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
