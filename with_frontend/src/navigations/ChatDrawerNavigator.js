// ChatDrawerNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatNavigator from "./BottomStackNavigations/ChatNavigator"; // 스택 네비게이터 임포트
import ChatDetailMenuScreen from "../screens/chat/ChatDetailMenuScreen";

const Drawer = createDrawerNavigator();

const ChatDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ChatStack"
      screenOptions={{ drawerPosition: "right" }} // 드로어가 오른쪽에서 열리도록 설정
      drawerContent={(props) => <ChatDetailMenuScreen {...props} />} // 드로어 내용 설정
    >
      <Drawer.Screen
        name="ChatStack"
        component={ChatNavigator}
        options={{ headerShown: false }} // 스택 네비게이터를 드로어의 메인으로 설정
      />
    </Drawer.Navigator>
  );
};

export default ChatDrawerNavigator;
