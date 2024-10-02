// src/screens/ChatDetailScreen.js

import React, { useLayoutEffect, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import MessageList from "../../components/chat/MessageList"; // MessageList 컴포넌트 가져오기
import ChatTextInput from "../../components/chat/ChatTextInput"; // ChatTextInput 컴포넌트 가져오기

const dummyImage = require("../../../assets/BoarderDummy.png");

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

const ChatDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(
    "{ChatDetailScreen} route.params : ",
    JSON.stringify(route.params)
  );
  const { users, messages, title, currentUserCount, picture, routeId } =
    route.params; // Id는 필요시 백엔드 통신에 사용

  // useLayoutEffect를 사용하여 네비게이션 옵션을 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerText}>{title} 4</Text>, // headerTitle을 함수로 설정하여 <Text> 컴포넌트 사용

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeftButton}
        >
          <Image
            source={require("../../../assets/BackIcon.png")} // 나가기(뒤로가기) 아이콘의 경로에 맞게 수정
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../../../assets/chatMenu.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, title]); // 네비게이션이나 제목이 바뀔 때 마다 헤더 타이틀이 바뀜. 저 타이틀로 , 그러니까 목록에서 선택한 제목이 헤더로 딸려옴

  // 여기서부터
  useEffect(() => {
    const parentNavigation = navigation.getParent();
    // console.log(parentNavigation);

    if (parentNavigation) {
      parentNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    }

    return () => {
      if (parentNavigation) {
        parentNavigation.setOptions({
          tabBarStyle: { display: "flex" },
        });
      }
    };
  }, [navigation]);
  // 여기까지  바텀탭안보이게하려함.

  // 새로운 메시지 추가 함수
  const addMessage = (newMessage) => {
    const newMessageObject = {
      id: (messages.length + 1).toString(),
      nickname: "나",
      message: newMessage,
      time: new Date().toLocaleTimeString(),
      isMyMessage: true,
      profileImage: "https://via.placeholder.com/150",
    };
    // setMessages([...messages, newMessageObject]); // 메시지 리스트에 새 메시지 추가

    // 그냥 백엔드에 지금 로그인한 아이디와 이름, time 갖고와서 뿌려주기
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined} // iOS에서는 키보드가 올라올 때 입력창이 가려지지 않도록 패딩 추가
      keyboardVerticalOffset={0} // 헤더가 있을 경우 적절한 값으로 조정
    >
      {/* 게시판 상세보기 */}

      {/* 상세 게시글로 가기 */}
      <TouchableOpacity onPress={() => {}}>
        <View
          style={{
            marginTop: 10,
            height: 60,
            backgroundColor: "#F4F8FB",
            marginHorizontal: 30,
            marginBottom: 0,
            borderRadius: 10,
            flexDirection: "row", // 가로로 배치
            alignItems: "center",
            borderColor: "#CCC",
            padding: 10,
            borderWidth: 1,
          }}
        >
          <Image
            source={dummyImage}
            style={{
              width: 70,
              height: 50,
              resizeMode: "cover", // 이미지를 가득 채움
              borderRadius: 5, // 이미지를 둥글게
              marginRight: 10, // 이미지와 텍스트 사이 간격
              paddingVertical: 10,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>게시판 상세보기</Text>

            {/* 날짜 부분 */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ opacity: 0.7 }}>작성자 젬마</Text>
              <Text style={{ opacity: 0.7 }}>09.24 - 09.26</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.messageListContainer}>
        <MessageList messages={messages} />
      </View>
      <View style={styles.chatInputContainer}>
        <ChatTextInput onSendMessage={addMessage} />
        {/* ChatTextInput 컴포넌트 추가 */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  messageListContainer: {
    flex: 1,
    padding: 18,
  },
  headerLeftButton: {
    paddingLeft: 10, // 왼쪽에 여백을 추가하여 터치 영역 확대
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 10, // 헤더 오른쪽 여백 설정
  },
  headerText: {
    fontSize: 18, // 기본 헤더 텍스트 크기
    fontWeight: "600", // semi-bold에 가까운 굵기
    color: "#000", // 헤더 텍스트 색상
    marginBottom: 5,
  },
  chatInputContainer: {
    padding: 5, // 내부 여백 제거
    margin: 0, // 외부 여백 제거
    backgroundColor: "#ffffff", // 필요 시 배경색 설정
  },
});

export default ChatDetailScreen;
