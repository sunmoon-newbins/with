import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import PostList from "../../components/Boards/PostList";

function HeartBoardScreen() {
  const [likedPosts, setLikedPosts] = useState([]); // 좋아요 누른 게시글 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 백엔드에서 좋아요 누른 게시글을 가져오는 함수
  const fetchLikedPosts = async () => {
    try {
      // 백엔드 API 호출
      // const response = await fetch('https://your-api.com/user/liked-posts', {
      //   method: 'GET',
      //   headers: {
      //     Authorization: 'Bearer ' + token, // 필요한 경우 인증 토큰 추가
      //   },
      // });
      // const data = await response.json();
      // setLikedPosts(data.likedPosts);

      // 여기서는 더미 데이터를 사용합니다.
      const dummyLikedPosts = [
        {
          id: "1",
          title: "바다 여행 루트 추천 해요",
          author: "이사벨라",
          time: "8m ago",
          imageUrl: "", // 로컬 이미지로 대체 가능
          description: "안녕하세요 먼 곳에서 오느라 고생많으셨어요. 제가 소...",
        },
        {
          id: "2",
          title: "게임 추천 루트 소개합니다",
          author: "이사벨라",
          time: "15m ago",
          imageUrl: "", // 로컬 이미지로 대체 가능
          description:
            "안녕하세요 게임을 좋아하시는 분들을 위해 제가 추천하는...",
        },
      ];
      setLikedPosts(dummyLikedPosts); // 더미 데이터를 상태에 저장
    } catch (error) {
      console.error("Failed to fetch liked posts", error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  useEffect(() => {
    fetchLikedPosts(); // 컴포넌트가 마운트될 때 좋아요 누른 게시글을 가져옴
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tabBarWrapper}></View>

      {/* 로딩 중일 때 로딩 인디케이터 표시 */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PostList data={likedPosts} /> // 좋아요 누른 게시글만 PostList에 전달
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 18,
  },
  tabBarWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12, // 아래 여백 추가
  },
});

export default HeartBoardScreen;
