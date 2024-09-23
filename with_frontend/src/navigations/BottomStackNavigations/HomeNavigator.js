import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/home/HomeScreen";
import BoardSearchScreen from "../../screens/home/BoardSearchScreen";
import RouteDetailScreen from "../../screens/home/RouteDetailScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "게시글" }} // 게시판 메인화면
      />
      <Stack.Screen
        name="BoardSearchScreen"
        component={BoardSearchScreen}
        options={{ headerShown: false }} // 게시판 검색
      />
      <Stack.Screen
        name="RouteDetailScreen"
        component={RouteDetailScreen}
        options={{ headerShown: false }} // 루트 게시판 상세화면
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
