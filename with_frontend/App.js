import React, { useEffect } from "react";
import "react-native-gesture-handler";

import useStore from "./src/components/user/useStore"; // zustand
import Toast from "react-native-toast-message"; // Toast 임포트
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigations/MainStackNavigator"; // 경로에 맞게 import
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";

export default function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const rememberMe = useStore((state) => state.rememberMe);
  const id = useStore((state) => state.id);
  const userId = useStore((state) => state.userId);

  console.log(
    "{App} isLoggedIn : ",
    isLoggedIn,
    ", rememberMe :",
    rememberMe,
    ", userId :",
    userId
  );
  return (
    <NavigationContainer>
      {/* 여기 주석풀면 한번로그인하면 자동로그인. */}

      {/* {isLoggedIn ? (
        <BottomTabNavigator />
      ) : (
        <MainStackNavigator /> // 로그인
      )} */}

      {/* <MainStackNavigator /> */}
      <BottomTabNavigator />
      {/* 개발중 */}

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
