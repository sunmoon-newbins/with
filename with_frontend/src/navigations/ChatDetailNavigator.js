// ChatDetailNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatDetailScreen from "../screens/chat/ChatDetailScreen";

import ChatDetailMenuScreen from "../screens/chat/ChatDetailMenuScreen"; // 드로어 메뉴 화면
import RouteDetailScreen from "../screens/home/RouteDetailScreen";

const Drawer = createDrawerNavigator();

const ChatDetailNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ChatDetailScreen"
      screenOptions={{ drawerPosition: "right" }} // 드로어가 오른쪽에 위치하도록 설정
      drawerContent={(props) => <ChatDetailMenuScreen {...props} />} // 드로어 메뉴 설정
    >
      <Drawer.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{ headerShown: true }} // 드로어 화면에서는 자체적으로 헤더 사용
      />

      <Drawer.Screen
        name="RouteDetailScreen"
        component={RouteDetailScreen}
        options={{ headerShown: false }} // 드로어 화면에서는 자체적으로 헤더 사용
      />
    </Drawer.Navigator>
  );
};

export default ChatDetailNavigator;
