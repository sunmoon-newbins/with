import React from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import RecentChatMessage from "../../components/chat/RecentChatMessage";

const chatRooms = [
  {
    // name: "홍길동"
    title: "서울 여행 루트 추천해요",
    message: "저도요!",
    time: "오전 7:32",
  },
  {
    title: "바다 여행 루트 추천해요",
    message: "좋어요!",
    time: "오후 10:31",
    name: "",
  },
];

function ChatListScreen() {
  const renderItem = ({ item }) => (
    <RecentChatMessage
      title={item.title}
      message={item.message}
      time={item.time}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/zemma.png")}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.username}>젬마</Text>
        </View>
      </View>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "stretch",
    margin: "0 auto",
    padding: "107px 23px 456px",
  },
  header: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    color: "rgba(32, 32, 32, 1)",
    whiteSpace: "nowrap",
    fontFamily: "Raleway, sans-serif",
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 16,
  },
  profileImage: {
    position: "relative",
    display: "flex",
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: 20, // 프로필 이미지를 원형으로 만들기 위한 스타일
  },
  username: {
    fontFamily: "Raleway, sans-serif",
    fontSize: 21,
    fontWeight: "700",
    color: "rgba(32, 32, 32, 1)",
  },
  list: {
    paddingBottom: 20, // 리스트 하단 여백 추가
  },
});

export default ChatListScreen;
