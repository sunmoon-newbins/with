import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import ChatListScreen from "../../screens/chat/ChatListScreen";
import ChatDetailScreen from "../../screens/chat/ChatDetailScreen";

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ChatListScreen">
      <Stack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{ title: "채팅" }} // 게시판 메인화면
      />
      {/* 여기에 
          채팅방 상세 
          채팅방 프로필 보기 (햄버거)
          채팅방에서 프로필 상세 (상대방) 
          해야함. 일단 하나만 넣어놓음 
          왜냐하면 DrawNavigation 이라해서 어떻게 구현할지모름.   */}
      <Stack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{ tabBarStyle: { display: "none" } }}

        // 탭바 안보이게 하려고했음.
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
