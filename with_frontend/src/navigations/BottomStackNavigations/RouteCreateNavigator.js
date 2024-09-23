import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainBoardWriteScreen from "../../screens/add/MainBoardWriteScreen"; // 1. 루트 게시판 작성 화면
import SearchPlaceScreen from "../../screens/add/SearchPlaceScreen"; // 2. 장소추가 눌렀을시 화면
import InsertMyPlaceScreen from "../../screens/add/InsertMyPlaceScreen"; // 3. 나만의 장소 추가 화면

const Stack = createStackNavigator();

const RouteCreateNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainBoardWriteScreen">
      <Stack.Screen
        name="MainBoardWriteScreen"
        component={MainBoardWriteScreen}
        options={{ title: "게시글 작성" }} // 게시판 메인화면
      />
      <Stack.Screen
        name="SearchPlaceScreen"
        component={SearchPlaceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InsertMyPlaceScreen"
        component={InsertMyPlaceScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RouteCreateNavigator;
