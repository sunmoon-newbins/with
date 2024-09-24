import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/start/StartScreen";
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from "../screens/start/LoginScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }} // 헤더 숨기기 (필요에 따라 설정)
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "게시글" }} // 헤더 제목 설정
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
