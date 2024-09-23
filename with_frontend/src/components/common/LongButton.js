import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LongButton = ({
  onPress,
  title = "Click me", // 기본값 설정
  buttonStyle,
  textStyle,
}) => (
  <TouchableOpacity
    style={[styles.button, buttonStyle]} // 기본 스타일과 props로 받은 스타일 병합
    onPress={onPress}
    accessibilityRole="button"
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: "rgba(87, 117, 205, 1)", // 기본 배경색
    shadowColor: "rgba(0, 0, 0, 0.161)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 37,
    marginTop: 20, // 기본 여백
    paddingVertical: 13,
    paddingHorizontal: 70,
    alignItems: "center",
  },
  text: {
    color: "rgba(243, 243, 243, 1)", // 기본 텍스트 색상
    textAlign: "center",
    fontFamily: "Nunito Sans",
    fontSize: 18, // 기본 폰트 크기
    fontWeight: "300",
  },
});

export default LongButton;
