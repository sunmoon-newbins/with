import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../navigations/BottomStackNavigations/HomeNavigator";
import HeartNavigator from "../navigations/BottomStackNavigations/HeartNavigator";
import RouteCreateNavigator from "../navigations/BottomStackNavigations/RouteCreateNavigator";
import ChatNavigator from "../navigations/BottomStackNavigations/ChatNavigator";
import MyInfoNavigator from "../navigations/BottomStackNavigations/MyInfoNavigator";

import CustomTabBar from "../components/common/CustomTabBar"; // CustomTabBar 컴포넌트 임포트

const BTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BTab.Navigator
      initialRouteName="HomeNavigator"
      tabBar={(props) => <CustomTabBar {...props} state={props.state} />} // 커스텀 탭바 사용 // state를 직접 전달
      screenOptions={{
        headerShown: false,
      }}
    >
      <BTab.Screen name="Home" component={HomeNavigator} />
      <BTab.Screen name="Heart" component={HeartNavigator} />
      <BTab.Screen name="Add" component={RouteCreateNavigator} />
      <BTab.Screen name="Chat" component={ChatNavigator} />
      <BTab.Screen name="User" component={MyInfoNavigator} />
    </BTab.Navigator>
  );
};

export default BottomTabNavigator;
