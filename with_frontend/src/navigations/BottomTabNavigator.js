import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Text } from "react-native"; // Image와 View, Text 컴포넌트 임포트

import Style from "../configs/Style.json"; // 파일명 from 풀경로

// 화면 컴포넌트 임포트
import HomeNavigator from "../navigations/BottomStackNavigations/HomeNavigator";
import HeartNavigator from "../navigations/BottomStackNavigations/HeartNavigator";
import RouteCreateNavigator from "../navigations/BottomStackNavigations/RouteCreateNavigator";
import ChatNavigator from "../navigations/BottomStackNavigations/ChatNavigator";
import MyInfoNavigator from "../navigations/BottomStackNavigations/MyInfoNavigator";

const BTab = createBottomTabNavigator();

const TabBarIcon = ({ source, size, color }) => {
  return (
    <Image
      source={source}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
};

const BottomTabNavigator = () => {
  return (
    <BTab.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconSource;

          switch (route.name) {
            case "Home":
              iconSource = require("../../assets/BottomHome.png");
              size = 40;
              break;
            case "Heart":
              iconSource = require("../../assets/BottomHeart.png");
              size = 40;
              break;
            case "Add":
              iconSource = require("../../assets/BottomAdd.png");
              size = 45;
              break;
            case "Chat":
              iconSource = require("../../assets/BottomChat.png");
              size = 40;
              break;
            case "User":
              iconSource = require("../../assets/BottomUser.png");
              size = 40;
              break;
          }

          return (
            <TabBarIcon
              source={iconSource}
              size={size}
              color={focused ? "#5775CD" : "#8F95B7"}
            />
          );
        },
        tabBarShowLabel: false, // 라벨 숨기기
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 0,
          height: 55, // 탭바 크기 근데 반응형으로 다른 스마트폰이면 어떡하죠??
        },
        tabBarItemStyle: ({ focused }) => ({
          backgroundColor: focused ? "#F4F8FB" : "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }),
      })}
    >
      <BTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <BTab.Screen
        name="Heart"
        component={HeartNavigator}
        options={{ headerShown: false }}
      />
      <BTab.Screen
        name="Add"
        component={RouteCreateNavigator}
        options={{ headerShown: false }}
      />
      <BTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{ headerShown: false }}
      />
      <BTab.Screen
        name="User"
        component={MyInfoNavigator}
        options={{ headerShown: false }}
      />
    </BTab.Navigator>
  );
};

export default BottomTabNavigator;
