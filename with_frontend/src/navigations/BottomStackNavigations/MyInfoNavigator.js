import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyInfoScreen from "../../screens/myInfo/MyInfoScreen";
import MyRouteBoardScreen from "../../screens/myInfo/MyRouteBoardScreen";
import MyReview from "../../screens/myInfo/MyReview";
import MyNotification from "../../screens/myInfo/MyNotification";

const Stack = createStackNavigator();

const MyInfoNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyInfoScreen">
      <Stack.Screen
        name="MyInfoScreen"
        component={MyInfoScreen}
        options={{ title: "내 정보" }} // 게시판 메인화면
      />
      <Stack.Screen
        name="MyRouteBoardScreen"
        component={MyRouteBoardScreen}
        options={{ title: "게시한 루트" }}
      />
      <Stack.Screen
        name="MyReview"
        component={MyReview}
        options={{ title: "받은 후기" }}
      />
      <Stack.Screen
        name="MyNotification"
        component={MyNotification}
        options={{ title: "알림" }}
      />
    </Stack.Navigator>
  );
};

export default MyInfoNavigator;
