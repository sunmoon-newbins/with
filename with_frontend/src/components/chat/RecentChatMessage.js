import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

function RecentChatMessage({ title, message, time, name, headCount }) {
  return (
    <View style={styles.container}>
      {/* 기차표 모양의 배경 */}
      <View style={styles.chatBoxContainer}>
        <Image
          source={require("../../../assets/chatBox.png")}
          style={styles.ticketBackground}
          //   resizeMode="contain" // 이미지가 잘리지 않도록 contain 모드 사용
          resizeMode="stretch"
        />
        <View style={styles.contentContainer}>
          {/* 제목 텍스트 */}
          <Text style={styles.title}>
            {title} {headCount}
          </Text>

          {/* 점선 */}
          <Image
            source={require("../../../assets/dottedLine.png")}
            style={styles.dottedLine}
            resizeMode="contain"
          />
          {/* 프로필 이미지와 메시지 */}
          <View style={styles.messageRow}>
            <Image
              resizeMode="contain"
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ef7bd5e132db9a0e92833bd76fb8f6075ec7fd9865e6fca6a35e4ea80b38477a?placeholderIfAbsent=true&apiKey=ee8d539f9a3f4b379629704d1c6bfca3",
              }}
              style={styles.userImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.messageText}>{message}</Text>
            </View>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10, // 양쪽 여백을 추가하여 잘리지 않게 조정
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chatBoxContainer: {
    width: "100%", // 부모 컨테이너의 너비에 맞추도록 설정
    // aspectRatio: 4, // 기차표 모양을 유지하기 위한 비율 설정
    height: 120,
    position: "relative",
    borderRadius: 10, // 모서리를 둥글게 처리
    backgroundColor: "#F4F8FB",
    overflow: "hidden", // 경계선 밖의 내용을 숨김
    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84, // 그림자 반경
    elevation: 5, // 안드로이드에서의 그림자 높이
    // marginHorizontal: -10, // 양쪽 여백을 음수로 설정하여 박스 밖으로 확장------------------------------------
  },
  ticketBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    // left: "-2.5",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 10, // 컨텐츠의 안쪽 여백
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5775CD",
    marginBottom: 8,
  },
  dottedLine: {
    width: "100%",
    height: 2,
    marginVertical: 5,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 3,
  },
  messageText: {
    fontSize: 13,
  },
  time: {
    fontSize: 12,
    color: "#a0a0a0",
    opacity: 0.6,
    textAlign: "right",
  },
});

export default RecentChatMessage;
