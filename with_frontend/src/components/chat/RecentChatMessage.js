import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

function RecentChatMessage({ title, message, time }) {
  return (
    <View style={styles.container}>
      {/* 박스 이미지 배경 */}
      <Image
        source={require("../../../assets/chatBox.png")}
        style={styles.backgroundImage}
      />
      {/* 제목 텍스트 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {/* 점선 이미지 */}
      <Image
        source={require("../../../assets/dottedLine.png")}
        style={styles.dottedLine}
        resizeMode="contain"
      />
      {/* 메시지 내용 */}
      <View style={styles.messageContainer}>
        <View style={styles.userInfo}>
          <Image
            resizeMode="contain"
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ef7bd5e132db9a0e92833bd76fb8f6075ec7fd9865e6fca6a35e4ea80b38477a?placeholderIfAbsent=true&apiKey=ee8d539f9a3f4b379629704d1c6bfca3",
            }}
            style={styles.userImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.username}>젬마</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </View>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%", // 전체 박스의 너비
    marginVertical: 10,
    padding: 10,
    alignItems: "flex-start", // 컨테이너의 기본 정렬을 왼쪽으로 설정
    justifyContent: "center",
    position: "relative", // 배경 이미지와의 겹침을 위해 상대적 위치 설정
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch", // 박스 이미지가 컨테이너를 채우도록 설정
  },
  titleContainer: {
    width: "100%", // 제목 컨테이너가 박스 너비를 채우도록 설정
    alignItems: "flex-start", // 제목을 왼쪽 정렬
    paddingVertical: 5,
    paddingLeft: 10, // 왼쪽 여백 추가
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5775CD",
  },
  dottedLine: {
    position: "absolute", // 절대 위치로 설정
    top: "33%", // 1/3 지점에 위치
    left: 10, // 박스 내부 왼쪽 정렬
    width: "95%", // 박스 너비의 95%를 차지
    height: 2,
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // 좌우로 정렬
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 15, // 메시지 부분을 점선 아래로 이동
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18, // 원형 프로필 이미지
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  username: {
    fontWeight: "semi-bold",
    fontSize: 14,
  },
  messageText: {
    fontSize: 12,
    marginTop: 3,
  },
  timeText: {
    fontSize: 12,
    color: "#333",
    alignSelf: "flex-end", // 시간만 오른쪽 정렬
  },
});

export default RecentChatMessage;
