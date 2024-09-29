import React, { useState, useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import ThreeTabButton from "./ThreeTabButton";

const ThreeTabBar = () => {
  const { width } = useWindowDimensions(); // 화면의 너비를 가져옴
  // 활성화된 탭의 인덱스를 저장하는 상태
  const [activeIndex, setActiveIndex] = useState(0);
  // 탭 변경에 따른 기능 실행
  useEffect(() => {
    // activeIndex 값에 따라 다른 함수 실행
    switch (activeIndex) {
      case 0:
        // 전체 탭을 선택했을 때 실행할 기능
        console.log("전체 탭 선택됨");
        handleAllTab();
        break;
      case 1:
        // 소개 탭을 선택했을 때 실행할 기능
        console.log("소개 탭 선택됨");
        handleIntroductionTab();
        break;
      case 2:
        // 모집 탭을 선택했을 때 실행할 기능
        console.log("모집 탭 선택됨");
        handleRecruitmentTab();
        break;
      default:
        break;
    }
  }, [activeIndex]); // activeIndex가 변경될 때마다 useEffect가 실행됨

  const handleAllTab = () => {
    // 전체 탭 클릭 시 실행할 로직
    console.log("전체 탭에 대한 기능 실행");
  };

  const handleIntroductionTab = () => {
    // 소개 탭 클릭 시 실행할 로직
    console.log("소개 탭에 대한 기능 실행");
  };

  const handleRecruitmentTab = () => {
    // 모집 탭 클릭 시 실행할 로직
    console.log("모집 탭에 대한 기능 실행");
  };
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
