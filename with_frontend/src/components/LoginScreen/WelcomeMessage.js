import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WelcomeMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>환영합니다! 👋</Text>
      <Text style={styles.message}>
        WYD 행사 후 한국 자유 여행 코스를 짜는데 어딜 가야할지 모르시겠나요? 이
        어플이 도움을 드릴 수 있음 좋겠어요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 22,
  },
  title: {
    color: "#0B1527",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "SF Pro Text, sans-serif",
    textAlign: "center",
    marginBottom: 11,
  },
  message: {
    color: "#595F67",
    fontSize: 13,
    lineHeight: 19,
    // fontFamily: "Roboto, sans-serif",
    textAlign: "center",
    letterSpacing: 0.34,
  },
});

export default WelcomeMessage;
