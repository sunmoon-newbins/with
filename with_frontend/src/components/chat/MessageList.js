import React, { useRef, useEffect } from "react"; // useRef와 useEffect 추가
import { View, FlatList, StyleSheet, Text } from "react-native";
import MessageItem from "./MessageItem"; // MessageItem 컴포넌트 가져오기

// 더미 데이터 예시 (실제 데이터로 교체 필요)

const MessageList = ({ messages, users }) => {
  const flatListRef = useRef(null); // FlatList의 ref 생성

  console.log("메시지리스트", messages);

  // messages가 없거나 빈 배열인 경우 처리
  if (!messages || messages.length === 0) {
    return <Text>메시지가 없습니다.</Text>; // 메시지가 없을 경우
  }

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true }); // 처음 로드 시 맨 아래로 스크롤
    }
  }, [messages]); // messages가 변경될 때마다 스크롤

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // FlatList에 ref 추가
        data={messages}
        renderItem={({ item }) => {
          const userInfo = users.filter((user) => {
            return user.userId == item.userId;
          });
          return <MessageItem messageData={item} userInfo={userInfo[0]} />;
        }}
        contentContainerStyle={styles.list}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        } // 내용 크기 변경 시 스크롤
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  list: {
    // paddingVertical: 10,
  },
});

export default MessageList;
