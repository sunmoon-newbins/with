// src/screens/ChatDetailScreen.js

import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import MessageList from "../../components/chat/MessageList"; // MessageList 컴포넌트 가져오기

const ChatDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { Id, title } = route.params; // Id는 필요시 백엔드 통신에 사용

  // useLayoutEffect를 사용하여 네비게이션 옵션을 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      // 숫자 그냥 넣어봄 이거 백엔드에서 ,,. 불러오는거로,,해야겠지,,?
      headerTitle: () => <Text style={styles.headerText}>{title} 4</Text>, // headerTitle을 함수로 설정하여 <Text> 컴포넌트 사용
      headerRight: () => (
        <TouchableOpacity onPress={() => alert("Menu clicked!")}>
          <Image
            source={require("../../../assets/chatMenu.png")} // 햄버거 아이콘 이미지 경로 설정
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, title]);

  // 여기서부터
  useEffect(() => {
    const parentNavigation = navigation.getParent();

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
  }, []);
  // 여기까지  바텀탭안보이게하려함.

  return (
    <View style={styles.container}>
      <MessageList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
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
});

export default ChatDetailScreen;
