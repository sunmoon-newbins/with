import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ChatListScreen from "../../screens/chat/ChatListScreen";
// import ChatDetailScreen from "../../screens/chat/ChatDetailScreen";

import ChatDetailNavigator from "../ChatDetailNavigator"; // ChatDetailNavigator를 임포트

const Stack = createStackNavigator();

const ChatNavigator = ({ navigation, route }) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ChatDetailNavigator") {
      // chatDetailScreen 에서 바꿈
      navigation.setOptions({ tabBarStyle: { display: "none" } }); // 바텀탭바 안보이게 , ,
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="ChatListScreen">
      <Stack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{ title: "채팅" }} // 게시판 메인화면
      />

      {/* <Stack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={(headershown = false)}
      /> */}
      <Stack.Screen
        name="ChatDetailNavigator" // ChatDetailScreen 대신 ChatDetailNavigator 사용
        component={ChatDetailNavigator}
        options={{ headerShown: false }} // 드로어 화면에서는 자체적으로 헤더 사용
      />

      {/* 여기서 내 정보 네비게이터 넣어서 쓰면됨.. */}
    </Stack.Navigator>
  );
};

export default ChatNavigator;
