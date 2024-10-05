import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyInfoScreen from "../../screens/myInfo/MyInfoScreen";
import MyRouteBoardScreen from "../../screens/myInfo/MyRouteBoardScreen";
import MyReview from "../../screens/myInfo/MyReview";
import MyNotification from "../../screens/myInfo/MyNotification";

const Stack = createStackNavigator();

import useStore from "../../components/user/useStore";

const MyInfoNavigator = ({ route }) => {
  const user = route?.params?.user
    ? route?.params?.user
    : useStore((state) => state);
  console.log("user = ", user);
  // 화면 누르면 로그인
  return (
    <Stack.Navigator initialRouteName="MyInfoScreen">
      <Stack.Screen
        name="MyInfoScreen"
        component={MyInfoScreen}
        options={{ headerShown: false }} // 게시판 메인화면
        initialParams={{ user }} // userId를 초기 파라미터로 전달
        // 여기서 하는거 아닌가 ?
        // 로그인한 아이디
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
