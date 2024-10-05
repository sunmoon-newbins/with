import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  FlatList,
} from "react-native";

// 1 이 챗봇

// 더미 데이터
const dummyMessages = [
  {
    userId: 1,
    content:
      "안녕하세요, 자매님! 오늘 무엇이 자매님의 마음을 무겁게 하고 있나요? 제가 도움이 될 수 있도록 말씀해 주시면 함께 고민해볼게요. 😊",
    sendDate: "10:30 AM",
  },
  {
    userId: 2,
    content: "친구랑 싸웠어요, 친구가 자꾸 맛없는 것만 골라서 시키는것 같아요.",
    sendDate: "10:32 AM",
  },
  {
    userId: 1,
    content:
      `자매님, 친구와의 다툼이 마음을 아프게 했겠군요. 사실, 작은 갈등이라도 감정이 상할 수 있는 게 자연스러운 일이에요.\n` +
      `\n하지만 친구분도 아마 자매님처럼 서로 잘 지내고 싶어할 거예요.\n\n` +
      `음식 선택에서 오는 불만은 종종 서로의 취향 차이에서 비롯될 수 있어요. 다음에 함께 메뉴를 고를 때는 자매님의 선호도도 분명히 표현해 보시는 건 어떨까요?\n\n` +
      `서로 조금씩 양보하면서 맛있는 음식을 찾으면 더 즐겁지 않을까 해요, 자매님. 친구분과도 다시 이야기 나눠보면 좋을 것 같아요. 😊`,
    sendDate: "10:35 AM",
  },
];

const dummyUsers = [
  { userId: 1, name: "안젤라" }, // 챗봇 사용자
  { userId: 2, name: "User" }, // 실제 사용자
];

// AngelScreen.js
const AngelScreen = () => {
  const [messageList, setMessageList] = useState(dummyMessages); // 더미 데이터로 초기화
  const [message, setMessage] = useState(""); // 입력 메시지 상태

  // FlatList 참조
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true }); // 메시지가 추가될 때마다 리스트 끝으로 스크롤
    }
  }, [messageList]);

  // 메시지 전송 함수
  const handleSendMessage = (newMessage) => {
    const newMessageObj = {
      userId: 2, // 현재 사용자의 ID
      content: newMessage,
      sendDate: "10:40 AM", // 더미 시간을 넣음
    };
    setMessageList((prevMessages) => [...prevMessages, newMessageObj]); // 새 메시지를 리스트에 추가
  };

  // 메시지 입력 처리 함수
  const handleSend = () => {
    if (message.trim().length > 0) {
      handleSendMessage(message.trim());
      setMessage(""); // 입력창 비우기
    }
  };

  return (
    <View style={styles.container}>
      {/* 메시지 리스트 */}
      <MessageList messages={messageList} users={dummyUsers} />

      {/* 입력창 */}
      <View style={styles.chatInputContainer}>
        <ChatTextInput
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
        />
      </View>
    </View>
  );
};

// ChatTextInput 컴포넌트
const ChatTextInput = ({ message, setMessage, handleSend }) => {
  const defaultIcon = require("../../../assets/SendButtonDefault.png");
  const sendIcon = require("../../../assets/sendButtonFill.png");

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="메시지 보내기"
        placeholderTextColor="#999"
        value={message}
        onChangeText={(text) => setMessage(text)}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
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

// MessageList 컴포넌트
const MessageList = ({ messages, users }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <Text style={{ textAlign: "center" }}>채팅방에 메시지가 없습니다</Text>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) => {
        const userInfo = users.find((user) => user.userId === item.userId);
        return <MessageItem messageData={item} userInfo={userInfo} />;
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

// MessageItem 컴포넌트
const MessageItem = ({ messageData, userInfo }) => {
  const isMyMessage = userInfo.userId === 2; // 사용자의 ID가 2일 때 내 메시지로 처리

  return (
    <View
      style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.otherMessage,
      ]}
    >
      {!isMyMessage && (
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/1.jpg" }}
          style={styles.profileImage}
        />
      )}

      <View style={styles.messageContent}>
        {!isMyMessage && <Text style={styles.nickname}>{userInfo.name}</Text>}
        <View style={styles.messageRow}>
          {isMyMessage ? (
            <>
              <Text style={styles.time}>{messageData.sendDate}</Text>
              <MessageBox
                isMyMessage={isMyMessage}
                message={messageData.content}
              />
            </>
          ) : (
            <>
              <MessageBox
                isMyMessage={isMyMessage}
                message={messageData.content}
              />
              <Text style={styles.time}>{messageData.sendDate}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

// MessageBox 컴포넌트
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
  container: {
    // padding: 5,
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  chatInputContainer: {
    padding: 5,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: "transparent",
    padding: 3,
  },
  icon: {
    width: 40,
    height: 40,
  },
  messageContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  myMessage: {
    justifyContent: "flex-end",
  },
  otherMessage: {
    justifyContent: "flex-start",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 20,
  },
  messageContent: {
    maxWidth: "75%",
    marginTop: 20,
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
    fontSize: 16,
    flexWrap: "wrap",
  },
  myMessageText: {
    color: "#fff",
  },
  otherMessageText: {
    color: "#333",
  },
  time: {
    fontSize: 10,
    color: "#999",
    margin: 5,
    alignSelf: "flex-end",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default AngelScreen;
