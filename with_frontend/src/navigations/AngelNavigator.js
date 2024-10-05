import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native";
import AngelScreen from "../screens/home/AngelScreen"; // 엔젤 스크린
import AngelSelectMenuScreen from "../screens/home/AngelSelectMenuScreen"; // 드로어 내부에 표시할 화면
import { Ionicons } from "@expo/vector-icons"; // 아이콘을 사용하려면 필요 (react-native-vector-icons도 가능)

const Drawer = createDrawerNavigator();

const AngelNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AngelSelectMenuScreen {...props} />} // 드로어에 표시될 화면 지정 그냥 셀렉트메뉴
      screenOptions={{
        drawerPosition: "right", // 드로어가 오른쪽에서 열리도록 설정
        // headerLeft: () => null, // 기본 왼쪽 햄버거 버튼을 숨김
      }}
    >
      <Drawer.Screen
        name="안젤라 상담소"
        component={AngelScreen}
        options={({ navigation }) => ({
          headerShown: true,
          // 왼쪽에 뒤로가기 버튼 설정
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={24} style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default AngelNavigator;
