// src/components/chat/MessageItem.js

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MessageItem = ({ messageData }) => {
  const isMyMessage = messageData.isMyMessage;

  return (
    <View
      style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.otherMessage, // true
      ]}
    >
      {!isMyMessage && ( // ! isMyMessage 내메시지가아니면 프로필 뜨게
        <Image
          source={{ uri: messageData.profileImage }}
          style={styles.profileImage}
        />
      )}
      <View style={styles.messageContent}>
        {!isMyMessage && ( // ! isMyMessage 내메시지가아니면  닉네임나오게
          <Text style={styles.nickname}>{messageData.nickname}</Text>
        )}
        <View
          style={[
            styles.messageBox,
            isMyMessage ? styles.myMessageBox : styles.otherMessageBox, // isMyMessage 마이메시지면 마이박스
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMyMessage ? styles.myMessageText : styles.otherMessageText, // 메시지에 맞는 텍스트 스타일 지정
            ]}
          >
            {messageData.message}
          </Text>
        </View>
        <Text style={styles.time}>{messageData.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  myMessage: {
    justifyContent: "flex-end", // 내 메시지는 오른쪽 정렬
  },
  otherMessage: {
    justifyContent: "flex-start", // 다른 사람 메시지는 왼쪽 정렬
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    maxWidth: "75%", // 메시지 박스의 최대 너비 설정
  },
  nickname: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  messageBox: {
    padding: 10,
    borderRadius: 10,
  },
  myMessageBox: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  otherMessageBox: {
    backgroundColor: "#e1e1e1",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16, // 모든 메시지의 기본 텍스트 크기
  },
  myMessageText: {
    color: "#fff", // 내가 보낸 메시지의 텍스트 색상
  },
  otherMessageText: {
    color: "#333", // 다른 사람이 보낸 메시지의 텍스트 색상
  },
  time: {
    fontSize: 10,
    color: "#999",
    marginTop: 5,
    alignSelf: "flex-end",
  },
});

export default MessageItem;
