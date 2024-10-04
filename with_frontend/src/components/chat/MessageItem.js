import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import useStore from "../user/useStore";
// 메시지 아이템 컴포넌트
const MessageItem = (params) => {
  // messageData 객체에서 필요한 데이터 추출
  const messageData = params.messageData;
  const userInfo = params.userInfo;
  const userId = useStore((state) => state.userId);
  const isMyMessage = userId == userInfo.userId;

  // console.log("메시지 렌더링", messageData);

  // 프로필 이미지 렌더링 함수
  const renderProfileImage = () => {
    if (!isMyMessage) {
      return (
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/3.jpg" }}
          style={styles.profileImage}
        />
      );
    }
    return null;
  };

  // 닉네임 렌더링 함수
  const renderNickname = () => {
    if (!isMyMessage) {
      return <Text style={styles.nickname}>{userInfo.name}</Text>;
    }
    return null;
  };

  // 메시지와 시간 렌더링 함수
  const renderMessageRow = () => (
    <View style={styles.messageRow}>
      {isMyMessage ? (
        // 내 메시지일 경우: 시간 먼저, 메시지 박스 나중에
        <>
          <Text style={styles.time}>{messageData.sendDate}</Text>
          <MessageBox isMyMessage={isMyMessage} message={messageData.content} />
        </>
      ) : (
        // 상대방 메시지일 경우: 메시지 박스 먼저, 시간 나중에
        <>
          <MessageBox isMyMessage={isMyMessage} message={messageData.content} />
          <Text style={styles.time}>{messageData.sendDate}</Text>
        </>
      )}
    </View>
  );

  return (
    <View
      style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.otherMessage,
      ]}
    >
      {renderProfileImage()}

      <View style={styles.messageContent}>
        {renderNickname()}
        {renderMessageRow()}
      </View>
    </View>
  );
};

// 메시지 박스 컴포넌트 분리
const MessageBox = ({ isMyMessage, message }) => (
  <View
    style={[
      styles.messageBox,
      isMyMessage ? styles.myMessageBox : styles.otherMessageBox,
    ]}
  >
    <Text
      style={[
        styles.messageText,
        isMyMessage ? styles.myMessageText : styles.otherMessageText,
      ]}
    >
      {message}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  myMessage: {
    justifyContent: "flex-end", // 나의 메시지는 오른쪽 정렬
  },
  otherMessage: {
    justifyContent: "flex-start", // 상대방 메시지는 왼쪽 정렬
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 15, // 프로필 이미지 하단 여백
    marginTop: 20, // 프로필 이미지 상단 여백
  },
  messageContent: {
    maxWidth: "75%", // 메시지 박스의 최대 너비 설정
    marginTop: 20, // 프로필 이미지보다 약간 아래에 위치하도록 설정
    alignItems: "flex-start",
  },
  nickname: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  messageBox: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "90%",
    // overflow: "hidden",
  },
  myMessageBox: {
    backgroundColor: "#5775CD",
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  otherMessageBox: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16, // 모든 메시지의 기본 텍스트 크기
    flexWrap: "wrap",
  },
  myMessageText: {
    color: "#fff", // 내가 보낸 메시지의 텍스트 색상
  },
  otherMessageText: {
    color: "#333", // 다른 사람이 보낸 메시지의 텍스트 색상
  },
  time: {
    fontSize: 10,
    color: "#999", // 시간 텍스트 색상
    margin: 5,
    alignSelf: "flex-end",
  },
  messageRow: {
    flexDirection: "row", // messageBox와 time을 가로로 배치
    alignItems: "flex-end", // 두 요소의 세로 정렬을 하단에 맞춤
  },
  myMessageRow: {
    flexDirection: "row", // 나의 메시지일 경우 time을 먼저 표시
    alignItems: "flex-end",
  },
  otherMessageRow: {
    flexDirection: "row", // 상대방 메시지일 경우 기본 순서 유지
    alignItems: "flex-end",
  },
});

export default MessageItem;
