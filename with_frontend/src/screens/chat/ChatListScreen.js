import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import RecentChatMessage from "../../components/chat/RecentChatMessage";

//  여기에서 어떤 채팅방들이 있는지 알 수 있어야하고 ,  ( ID , 글제목, 인원수 ) 그냥 ID , 글제목, 인원수 글 Id 만알면  해당 채팅방 정보 다 갖고올 수 있을텐데.
// 가장 최신 채팅 글의 닉네임, 메시지, 시간
const chatRooms = [
  {
    boardIndex: 1, // 채팅방 아이디 ?
    name: "유재석",
    title: "서울 여행 루트 추천해요",
    message: "저도요!",
    time: "오전 7:32",
    headCount: "4",
  },
  {
    boardIndex: 2, // 채팅방 아이디 ?
    name: "박명수",
    title: "바다 여행 루트 추천해요",
    message: "좋아요!",
    time: "오후 10:31",
    headCount: "5",
  },
  {
    boardIndex: 3, // 채팅방 아이디 ?
    name: "하하",
    title: "바다 여행 루트 추천해요",
    message: "좋아요!",
    time: "오후 10:31",
    headCount: "9",
  },
  {
    boardIndex: 4, // 채팅방 아이디 ?
    name: "노홍철",
    title: "바다 여행 루트 추천해요",
    message: "좋아요!",
    time: "오후 10:31",
    headCount: "10",
  },
  {
    boardIndex: 5, // 채팅방 아이디 ?
    name: "정형돈",
    title: "바다 여행 루트 추천해요",
    message: "좋아요!",
    time: "오후 10:31",
    headCount: "12",
  },
];

function ChatListScreen() {
  const navigation = useNavigation();

  // 렌더 아이템을 이렇게 묶어주면 눌렀을때 해당 스크린으로 넘어가게 된다.
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        // navigation.navigate("ChatDetailScreen", {
        //   // title 과 Id를 넘겨줌.
        //   title: item.title,
        //   Id: item.boardIndex,
        // })

        navigation.navigate("ChatDetailNavigator", {
          screen: "ChatDetailScreen",
          params: { title: item.title, Id: item.boardIndex },
        })
      }
    >
      <RecentChatMessage
        // index={item.index} //  이거는 넣어줘야되나? 렌더링 되는게 아니기떄문에
        title={item.title}
        message={item.message}
        time={item.time}
        name={item.name}
        headCount={item.headCount}
      />
    </TouchableOpacity>
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
          <Text style={styles.username}>니콜라스</Text>
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
    flex: 1, // 전체 화면을 채우도록 설정
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 18, // 전체 패딩
    alignItems: "center", // 화면 가운데 정렬
  },
  header: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // 프로필 이미지를 원형으로 만들기 위한 스타일
    marginRight: 10, // 텍스트와 간격 설정
  },
  username: {
    fontSize: 21,
    fontWeight: "700",
    color: "rgba(32, 32, 32, 1)",
  },
  list: {
    alignItems: "center", // 리스트 아이템을 가운데 정렬
    paddingBottom: 10, // 리스트 하단 여백 추가
  },
});

export default ChatListScreen;
