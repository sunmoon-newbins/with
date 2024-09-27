import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const ThreeTabButton = ({ title, isActive, onPress }) => {
  const { width } = useWindowDimensions(); // 화면의 너비를 가져옴
  const buttonWidth = Math.min(width * 0.2, 100); // 버튼의 최대 너비를 설정

  return (
    <TouchableOpacity
      style={[
        styles.tabButton,
        isActive && styles.activeTabButton,
        { width: buttonWidth }, // 버튼의 너비를 반응형으로 설정
      ]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      <Text
        style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
    borderRadius: 8,
    backgroundColor: "rgba(244, 248, 251, 1)",
    paddingVertical: 10,
    paddingHorizontal: 15, // 가로 여백을 줄여서 텍스트 크기에 맞추기
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabButton: {
    backgroundColor: "rgba(87, 117, 205, 1)",
  },
  tabButtonText: {
    color: "#222",
    fontWeight: "500",
    fontSize: 16,
    // fontFamily: "Inter, sans-serif",
  },
  activeTabButtonText: {
    color: "#FFF",
  },
});

export default ThreeTabButton;
