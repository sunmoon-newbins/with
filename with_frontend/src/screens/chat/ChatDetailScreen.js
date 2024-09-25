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

const ChatDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { Id, title } = route.params; // Id는 필요시 백엔드 통신에 사용

  // useLayoutEffect를 사용하여 네비게이션 옵션을 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerText}>{title} 4</Text>, // headerTitle을 함수로 설정하여 <Text> 컴포넌트 사용
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Menu clicked!")}>
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined} // iOS에서는 키보드가 올라올 때 입력창이 가려지지 않도록 패딩 추가
      keyboardVerticalOffset={0} // 헤더가 있을 경우 적절한 값으로 조정
    >
      <View style={styles.messageListContainer}>
        <MessageList />
      </View>
      <View style={styles.chatInputContainer}>
        <ChatTextInput />
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
