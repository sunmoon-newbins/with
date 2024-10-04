import React from "react";
import { View, StyleSheet, Text } from "react-native";

import style from "../../configs/Style.json";
function RecentSearchItem({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: style.APP_SECONDARY_COLOR, // 배경색 설정
    paddingVertical: 8, // 세로 패딩
    paddingHorizontal: 16, // 가로 패딩
    marginVertical: 6, // 위아래 여백
    marginRight: 8, // 오른쪽 여백
  },
  text: {
    color: "#000000", // 글자 색상 검은색
    opacity: 0.7, // 투명도 70%
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default RecentSearchItem;
