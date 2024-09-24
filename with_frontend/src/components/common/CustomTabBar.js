import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";

import Style from "../../configs/Style.json";

// 상수 정의
const TAB_ICON_MAP = {
  Home: require("../../../assets/BottomHome.png"),
  Heart: require("../../../assets/BottomHeart.png"),
  Add: require("../../../assets/BottomAdd.png"),
  Chat: require("../../../assets/BottomChat.png"),
  User: require("../../../assets/BottomUser.png"),
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        // 개별 탭 아이템을 렌더링하는 함수
        return renderTabItem({
          route,
          index,
          isFocused: state.index === index,
          navigation,
          descriptors,
        });
      })}
    </View>
  );
};

// 탭 아이템을 렌더링하는 함수
const renderTabItem = ({
  route, // 현재 탭의 경로 정보를 담고 있는 객체입니다. 예를 들어 name, key
  index,
  isFocused, // isFocused: 현재 탭이 선택된 상태인지 여부를 나타냅니다. state.index === index로 확인
  navigation,
  descriptors,
}) => {
  const { options } = descriptors[route.key];
  const label = options.tabBarLabel || options.title || route.name;

  // 탭 아이템 클릭 이벤트 처리
  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      key={index}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabItem, isFocused && styles.focusedTabItem]}
    >
      <Image
        source={TAB_ICON_MAP[route.name]} // 탭 이름에 따라 아이콘 설정
        style={[
          styles.icon,
          {
            tintColor: isFocused
              ? Style.APP_PRIMARY_COLOR
              : Style.APP_TERTIARY_COLOR,
          },
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

// 스타일 객체 정의
const styles = {
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: Style.BOTTOM_TAB_BACKGROUND_COLOR, // 탭바 배경색
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.2),
  },
  focusedTabItem: {
    backgroundColor: Style.BOTTOM_TAB_COLOR, // 선택된 탭의 배경색 F4F8FB  e6f1fa  60aff0 f0f8ff
  },
  icon: {
    width: responsiveWidth(8), // 너비를 반응형으로 설정
    height: responsiveWidth(8), // 높이를 반응형으로 설정
  },
};

export default CustomTabBar;
