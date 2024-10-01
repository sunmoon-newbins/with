import React, { useRef, useEffect } from "react"; // useRef와 useEffect 추가
import { View, FlatList, StyleSheet, Text } from "react-native";
import MessageItem from "./MessageItem"; // MessageItem 컴포넌트 가져오기

// 더미 데이터 예시 (실제 데이터로 교체 필요)
const messages = [
  {
    id: "1",
    nickname: "유재석",
    message: "저도요!",
    time: "12:05",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    nickname: "나",
    message: "같이 여행가고싶어요우",
    time: "12:05",
    isMyMessage: true,
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    nickname: "유재석",
    message: "좋은 생각이네요!",
    time: "12:06",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
  // 추가 메시지 더미 데이터
  {
    id: "4",
    nickname: "노홍철",
    message: "그러면 어디서 ",
    time: "12:06",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    nickname: "노홍철",
    message: "만나는게 좋을까요?",
    time: "12:07",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    nickname: "노홍철",
    message: "하하하",
    time: "12:08",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    nickname: "박명수",
    message: "음 우리집 앞에서 만나",
    time: "12:09",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    nickname: "박명수",
    message: "알았어 ?!",
    time: "12:09",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: "9",
    nickname: "박명수",
    message: "몰랐어 ?!",
    time: "12:09",
    isMyMessage: false,
    profileImage: "https://via.placeholder.com/150",
  },
];

const MessageList = () => {
  const flatListRef = useRef(null); // FlatList의 ref 생성

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
        renderItem={({ item }) => <MessageItem messageData={item} />}
        keyExtractor={(item) => item.id}
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
