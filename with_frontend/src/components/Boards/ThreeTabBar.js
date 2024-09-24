import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import ThreeTabButton from "./ThreeTabButton";

const ThreeTabBar = () => {
  const { width } = useWindowDimensions(); // 화면의 너비를 가져옴
  // 활성화된 탭의 인덱스를 저장하는 상태
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { title: "전체", isActive: activeIndex === 0 },
    { title: "소개", isActive: activeIndex === 1 },
    { title: "모집", isActive: activeIndex === 2 },
  ];

  return (
    <View style={[styles.tabContainer, { maxWidth: width * 0.8 }]}>
      {tabs.map((tab, index) => (
        <ThreeTabButton
          key={index}
          title={tab.title}
          isActive={tab.isActive}
          // 버튼을 클릭하면 activeIndex를 현재 인덱스로 변경
          onPress={() => setActiveIndex(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between", // 탭을 화면에 맞게 분배
    gap: 13,
  },
});

export default ThreeTabBar;
