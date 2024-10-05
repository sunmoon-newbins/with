import React from "react";

import { TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/home/HomeScreen";
import BoardSearchScreen from "../../screens/home/BoardSearchScreen";
import RouteDetailScreen from "../../screens/home/RouteDetailScreen";
import RecommendScreen from "../../screens/home/RecommendScreen";
import AngelNavigator from "../AngelNavigator";
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

      <Stack.Screen
        name="AngelNavigator"
        component={AngelNavigator} // AngelScreen이 아닌 AngelNavigator를 사용!
        options={{ headerShown: false }} // Drawer Navigator 내부에서 헤더를 사용
      />

      <Stack.Screen
        name="RecommendScreen"
        component={RecommendScreen}
        options={{ title: "추천 어플" }} // 루트 게시판 상세화면
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
