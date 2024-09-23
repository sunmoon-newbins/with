// BottomTabNavigator.js
// 여기를 이제 각각 붙여야함.

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // 네비게이터 쓰는거
import { MaterialCommunityIcons } from "@expo/vector-icons"; //이거 아이콘인데 안쓸 듯

// 화면 컴포넌트 임포트

import HomeNavigator from "../navigations/BottomStackNavigations/HomeNavigator";
import HeartNavigator from "../navigations/BottomStackNavigations/HeartNavigator";
import RouteCreateNavigator from "../navigations/BottomStackNavigations/RouteCreateNavigator";
import ChatNavigator from "../navigations/BottomStackNavigations/ChatNavigator";
import MyInfoNavigator from "../navigations/BottomStackNavigations/MyInfoNavigator";

const BTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BTab.Navigator
      initialRouteName="HomeNavigator"
      tabBarOptions={{ activeTintColor: "black", inactiveTintColor: "gray" }}
      screenOptions={{ headerShown: false }}
    >
      {/* MaterialCommunityIcons 중에서 두가지 고르고, 크기와 색깔은 부모 컴포넌트(BTab.Navigator)에 따라서 적용 */}
      <BTab.Screen
        name="홈(게시글목록)"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BTab.Screen
        name="HeartNavigator"
        component={HeartNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-search"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BTab.Screen
        name="RouteCreateNavigator"
        component={RouteCreateNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="car" size={size} color={color} />
          ),
        }}
      />
      <BTab.Screen
        name="ChatNavigator"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      {/* //스택네비게이터가 둥지틀 장소  */}
      <BTab.Screen
        name="MyInfoNavigator"
        component={MyInfoNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </BTab.Navigator>
  );
};

export default BottomTabNavigator;
