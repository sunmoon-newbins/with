import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

// import { useNavigation } from "@react-navigation/native";
import RecentChatMessage from "../../components/chat/RecentChatMessage";
import axios from "axios";

//  여기에서 어떤 채팅방들이 있는지 알 수 있어야하고 ,  ( ID , 글제목, 인원수 ) 그냥 ID , 글제목, 인원수 글 Id 만알면  해당 채팅방 정보 다 갖고올 수 있을텐데.
// 가장 최신 채팅 글의 닉네임, 메시지, 시간

import IPConfig from "../../configs/IPConfig.json";
import useStore from "../../components/user/useStore";

function ChatListScreen({ navigation }) {
  // const navigation = useNavigation();

  const userName = useStore((state) => state.name);

  const userId = useStore((state) => state.userId);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // 채팅방 리스트 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: IPConfig.IP + `/users/${userId}/chatting`,
          headers: { "Content-Type": "application/json" },
        });

        if (response.data) {
          console.log(
            "{ChatListScreen} fetchData / response.data = ",
            response.data
          );
          setChatList(response.data);
        }
      } catch (error) {
        console.log("데이터 가져오기 실패2", error);
      }
    };

    fetchData();
  }, []);

  const handleChatDetailScreen = async (item) => {
    try {
      const response = await axios({
        method: "get",
        url: IPConfig.IP + `/users/${userId}/chatting/${item.chattingRoomId}`,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        console.log(
          "{ChatListScreen} handleChatDetailScreen / response.data = ",
          response.data
        );
        navigation.navigate("ChatDetailNavigator", {
          screen: "ChatDetailScreen",
          params: {
            users: response.data.users,
            messages: response.data.messages,
            chattingId: item.chattingRoomId,
            title: item.title,
            currentUserCount: item.currentUserCount,

            picture: response.data.picture,
            routeId: response.data.routeId,
            startDate: response.data.startDate, // 시작
            endDate: response.data.endDate, // 종료
            writerName: response.data.writerName, // 글 작가
          },
        });
      }
    } catch (error) {
      console.log("데이터 가져오기 실패1", error);
    }
  };

  // 렌더 아이템을 이렇게 묶어주면 눌렀을때 해당 스크린으로 넘어가게 된다.
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        // navigation.navigate("ChatDetailScreen", {
        //   // title 과 Id를 넘겨줌.
        //   title: item.title,
        //   Id: item.boardIndex,
        // })
        handleChatDetailScreen(item)
      }
    >
      <RecentChatMessage
        // index={item.index} //  이거는 넣어줘야되나? 렌더링 되는게 아니기떄문에
        title={item.title}
        message={item.content}
        time={item.sendDate} //
        name={item.userName}
        headCount={item.currentUserCount}
        image={item.profile}
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
          <Text style={styles.username}>{userName}</Text>
        </View>
      </View>
      <FlatList
        data={chatList}
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
