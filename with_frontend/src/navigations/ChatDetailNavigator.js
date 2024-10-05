// ChatDetailNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatDetailScreen from "../screens/chat/ChatDetailScreen";

import ChatDetailMenuScreen from "../screens/chat/ChatDetailMenuScreen"; // 드로어 메뉴 화면
import RouteDetailScreen from "../screens/home/RouteDetailScreen";
import MyInfoNavigator from "./BottomStackNavigations/MyInfoNavigator";

const Drawer = createDrawerNavigator();

const ChatDetailNavigator = ({ route }) => {
  const { users } = route.params; // ChatDetailScreen에서 받은 users 데이터를 가져옴
  return (
    <Drawer.Navigator
      initialRouteName="ChatDetailScreen"
      screenOptions={{ drawerPosition: "right" }} // 드로어가 오른쪽에 위치하도록 설정
      drawerContent={(props) => (
        <ChatDetailMenuScreen {...props} users={users} />
      )} // 드로어 메뉴 설정
    >
      <Drawer.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{ headerShown: true }}
      />

      {/* <Drawer.Screen
        name="RouteDetailScreen"
        component={RouteDetailScreen}
        options={{ headerShown: false }} // 드로어 화면에서는 자체적으로 헤더 사용
      /> */}

      <Drawer.Screen
        name="MyInfoNavigator"
        component={MyInfoNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default ChatDetailNavigator;
