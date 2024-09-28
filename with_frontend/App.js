import React, { useEffect } from "react";
import "react-native-gesture-handler";

import useStore from "./src/components/user/useStore"; // zustand

import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigations/MainStackNavigator"; // 경로에 맞게 import
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";

export default function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const rememberMe = useStore((state) => state.rememberMe);
  const id = useStore((state) => state.id);

  console.log("로그인", isLoggedIn, "자동로그인", rememberMe, "아이디", id);
  return (
    <NavigationContainer>
      {/* 여기 주석풀면 한번로그인하면 자동로그인. */}

      {isLoggedIn && rememberMe ? (
        <BottomTabNavigator />
      ) : (
        <MainStackNavigator />
      )}

      {/* <MainStackNavigator /> */}
      {/* 개발중 */}
    </NavigationContainer>
  );
}
