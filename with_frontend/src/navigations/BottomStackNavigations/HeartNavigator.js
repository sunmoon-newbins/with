import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HeartBoarderScreen from "../../screens/heart/HeartBoardScreen";

const Stack = createStackNavigator();
const HeartNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HeartBoarderScreen">
      <Stack.Screen
        name="HeartBoarderScreen"
        component={HeartBoarderScreen}
        options={{ title: "좋아요 누른 게시글" }} // 게시판 메인화면
      />
    </Stack.Navigator>
  );
};

export default HeartNavigator;
