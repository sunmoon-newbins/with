// components/PostList.js
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PostItem from "./PostItem";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 사용

import RouteDetailScreen from "../../screens/home/RouteDetailScreen";

const posts = [
  {
    id: "1",
    title: "바다 여행 루트 추천 해요",
    author: "이사벨라",
    time: "8m ago",
    imageUrl: "", // ImageURL 로 하는데 일단 더미 사진으로 대체 https://example.com/game.png
    description: "안녕하세요 먼 곳에서 오느라 고생많으셨어요. 제가 소...",
  },
  {
    id: "2",
    title: "게임 추천 루트 소개합니다",
    author: "이사벨라",
    time: "15m ago",
    imageUrl: "",
    description: "안녕하세요 게임을 좋아하시는 분들을 위해 제가 추천하는...",
  },
  // 더 많은 게시글 데이터...
];

const PostList = () => {
  const navigation = useNavigation(); // 네비게이션 훅 사용
  return (
    <FlatList
      data={posts} // renderItem 을 item -> postItem 으로
      renderItem={({ item }) => (
        <PostItem
          title={item.title}
          author={item.author}
          time={item.time}
          imageUrl={item.imageUrl}
          description={item.description}
          onPress={
            () => navigation.navigate("RouteDetailScreen", { postId: item.id }) // PostDetailScreen으로 네비게이트
          }
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // padding: 16,
  },
});

export default PostList;
