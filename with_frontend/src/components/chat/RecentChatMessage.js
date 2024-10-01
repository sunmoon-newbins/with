import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

function RecentChatMessage({ title, message, time, name, headCount, image }) {
  return (
    <View style={styles.container}>
      {/* 기차표 모양의 배경 */}
      <View style={styles.chatBoxContainer}>
        <Image
          source={require("../../../assets/NewChatBox.png")}
          style={styles.ticketBackground}
          //   resizeMode="contain" // 이미지가 잘리지 않도록 contain 모드 사용
          resizeMode="contain"
        />
        {/* 전체패딩줌 30 */}
        <View style={styles.contentContainer}>
          {/* 제목 텍스트 */}
          {/* 제목 패딩 15 */}
          <View
            style={{
              paddingBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>{title}</Text>

            <Text
              style={{
                opacity: 0.5,
                paddingTop: 2,
              }}
            >
              {headCount}
            </Text>
          </View>

          {/* 점선 */}

          {/* 프로필 이미지와 메시지
          메시지 뷰 패딩 두기 */}
          <View style={styles.messageRow}>
            <Image
              resizeMode="contain"
              source={{
                uri: image, // image 가 url 이기떄문에
              }}
              style={styles.userImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.username}>{name}</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.messageText}>{message}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatBoxContainer: {
    width: "100%", // 부모 컨테이너의 너비에 맞추도록 설정

    height: 120,
    position: "relative",
    borderRadius: 10, // 모서리를 둥글게 처리
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
    padding: 30, // 컨텐츠의 안쪽 여백
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5775CD",
    // marginBottom: 8,
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
    paddingBottom: 7,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
    color: "#000000",
    opacity: 0.5,
    textAlign: "right",
  },
});

export default RecentChatMessage;
