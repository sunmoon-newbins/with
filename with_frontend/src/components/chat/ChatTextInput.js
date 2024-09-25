import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const ChatTextInput = () => {
  const defaultIcon = require("../../../assets/SendButtonDefault.png");
  const sendIcon = require("../../../assets/sendButtonFill.png");

  // 입력된 텍스트를 저장하는 state
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="메시지 보내기" // 입력창 플레이스홀더
          placeholderTextColor="#999" // 플레이스홀더 텍스트 색상
          value={message} // 입력된 텍스트
          onChangeText={(text) => setMessage(text)} // 텍스트가 바뀔 때마다 state 업데이트
        />
      </View>
      <TouchableOpacity style={styles.button}>
        {/* 텍스트가 없을 때는 기본 아이콘, 있을 때는 비행기 아이콘 */}
        <Image
          source={
            message.length === 0 || message.trim().length === 0
              ? defaultIcon
              : sendIcon
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // 가로 정렬
    alignItems: "center", // 세로 가운데 정렬
    // backgroundColor: "#f5f5f5", // 전체 배경색
    // borderRadius: 25, // 둥근 모서리
    // padding: 5, // 내부 여백
    marginLeft: 5,
    // margin: 0,
  },
  inputContainer: {
    flex: 1, // 남은 공간을 모두 사용
    backgroundColor: "#eeeeee", // 입력창 배경색
    borderRadius: 25, // 둥근 모서리
    paddingHorizontal: 15, // 수평 여백
  },
  input: {
    height: 40, // 입력창 높이
    fontSize: 16, // 텍스트 크기
  },
  button: {
    backgroundColor: "transparent", // 버튼 배경 투명하게 설정
    padding: 3, // 버튼 내부 여백
  },
  icon: {
    width: 40, // 아이콘 너비
    height: 40, // 아이콘 높이
  },
});

export default ChatTextInput;
