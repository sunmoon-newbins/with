import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PixelRatio,
} from "react-native";

// 반응형 크기 계산 함수들
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// 기준 폰의 너비와 높이 (예: iPhone 8)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// 너비에 따른 비율 계산 함수
const scaleSize = (size) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

// 폰트 크기에 따른 비율 계산 함수
const scaleFont = (size) => size * PixelRatio.getFontScale();

// 메시지 아이템 컴포넌트
const MessageItem = ({ messageData }) => {
  // messageData 객체에서 필요한 데이터 추출
  const { isMyMessage, profileImage, nickname, time, message } = messageData;

  // 프로필 이미지 렌더링 함수
  const renderProfileImage = () => {
    if (!isMyMessage) {
      return (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      );
    }
    return null;
  };

  // 닉네임 렌더링 함수
  const renderNickname = () => {
    if (!isMyMessage) {
      return <Text style={styles.nickname}>{nickname}</Text>;
    }
    return null;
  };

  // 메시지와 시간 렌더링 함수
  const renderMessageRow = () => (
    <View style={isMyMessage ? styles.myMessageRow : styles.otherMessageRow}>
      {!isMyMessage && (
        <MessageBox isMyMessage={isMyMessage} message={message} />
      )}
      <Text style={styles.time}>{time}</Text>
      {isMyMessage && (
        <MessageBox isMyMessage={isMyMessage} message={message} />
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
    marginBottom: scaleSize(3), // 반응형으로 변경
  },
  myMessage: {
    justifyContent: "flex-end", // 나의 메시지는 오른쪽 정렬
  },
  otherMessage: {
    justifyContent: "flex-start", // 상대방 메시지는 왼쪽 정렬
  },
  profileImage: {
    width: scaleSize(40), // 반응형으로 변경
    height: scaleSize(40), // 반응형으로 변경
    borderRadius: scaleSize(20), // 반응형으로 변경
    marginRight: scaleSize(10), // 반응형으로 변경
    marginBottom: scaleSize(15), // 반응형으로 변경
    marginTop: scaleSize(20), // 반응형으로 변경
  },
  messageContent: {
    maxWidth: "75%", // 메시지 박스의 최대 너비 설정
    marginTop: scaleSize(20), // 반응형으로 변경
  },
  nickname: {
    fontSize: scaleFont(14), // 반응형으로 변경
    color: "#333",
    marginBottom: scaleSize(2), // 반응형으로 변경
  },
  messageBox: {
    padding: scaleSize(10), // 반응형으로 변경
    borderRadius: scaleSize(10), // 반응형으로 변경
  },
  myMessageBox: {
    backgroundColor: "#5775CD",
    alignSelf: "flex-end",
  },
  otherMessageBox: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: scaleFont(16), // 반응형으로 변경
  },
  myMessageText: {
    color: "#fff", // 내가 보낸 메시지의 텍스트 색상
  },
  otherMessageText: {
    color: "#333", // 다른 사람이 보낸 메시지의 텍스트 색상
  },
  time: {
    fontSize: scaleFont(10), // 반응형으로 변경
    color: "#999", // 시간 텍스트 색상
    margin: scaleSize(5), // 반응형으로 변경
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
