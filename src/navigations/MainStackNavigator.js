import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }} // 헤더 숨기기 (필요에 따라 설정)
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "LoginScreen" }} // 헤더 제목 설정
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "HomeScreen" }} // 헤더 제목 설정
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
