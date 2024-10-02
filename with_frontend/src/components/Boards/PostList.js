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
    currentMember: 5,
    maxMember: 10,
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

// 여기서 기본으로는 최신순 정렬인데 , ,

// 3 탭 (전체, 모집, 소개 ) 뭘 선택했냐에 따라  요청 달리해서 보내야하고
// 정렬 누른거에 따라 또 다르게 보여줘야함.

// 근데 그거 상태관리 아직안함..

const PostList = ({ searchQuery, data }) => {
  // searchQuery prop 받기
  const navigation = useNavigation(); // 네비게이션 훅 사용

  // 검색어를 기준으로 게시물 필터링
  // const filteredPosts = posts.filter((post) => {
  //   // title이 존재하고 searchQuery를 포함하는 경우만 필터링
  //   return post.title?.toLowerCase().includes(searchQuery.toLowerCase());
  // });
  console.log("잘 받아오나 : ", searchQuery);
  console.log("{PostList} data ", data);

  return (
    <FlatList
      data={data} // renderItem 을 item -> postItem 으로
      renderItem={({ item }) => (
        <PostItem
          title={item.title}
          author={item.author}
          time={item.time}
          imageUrl={item.imageUrl}
          description={item.description}
          currentMember={item.currentMember}
          maxMember={item.maxMember}
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
