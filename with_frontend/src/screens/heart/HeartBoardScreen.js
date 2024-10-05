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
          id: "10",
          title: "3박 4일동안 나만 아는 부산 핫플레이스",
          author: "김정동",
          time: "8m ago",
          imageUrl:
            "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1723942699823-956bb643857d%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&type=sc960_832", // 로컬 이미지로 대체 가능
          description: "부산 하면 바다, 바다하면 해운대와 서면 같이 서핑...",
        },
        {
          id: "11",
          title: "4일 동안 부산에서 배를 타고 떠나는 여행",
          author: "로라",
          time: "15m ago",
          imageUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTlfMjgw%2FMDAxNzEwNzkxMTIxNjQ1.KCXGHo1y0il0ejAm8MAyyiCtddwrr2LMlzzYleZuQAUg.TKp9cdARlt91ySzxxLhxaxQxaUGWZ4LHoPN3ME03HlEg.JPEG%2FIMG_4430.JPG&type=l340_165", // 로컬 이미지로 대체 가능
          description:
            "나는 멋진 부산에서 15년 동안 살았습니다. 배를 타고 부산을 즐겨보자...",
        },
        {
          id: "12",
          title: "뉴진스코드 in 부산 여행 코스",
          author: "킴민지",
          time: "15m ago",
          imageUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMzExMDNfMjg5%2FMDAxNjk4OTkyNjE1ODcx.vJGNyyErGwt9FWwmrMXP1lSNfiM-X92_M8-GkC8d7wIg.Zs0ilSHgV3AK5BHIN6dkifFfrKhN-LaGgk4YMqMPr28g.PNG%2FIGC8czNmthjFAOvtGO1dmSZB4CfM.jpg&type=a340", // 로컬 이미지로 대체 가능
          description: "뉴진스가 갔던곳 가보고 싶으신분 컴컴...",
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
