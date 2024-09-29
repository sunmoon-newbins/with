import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import SearchButton from "../../components/common/SearchButton";
import ThreeTabBar from "../../components/Boards/ThreeTabBar";
import SortButton from "../../components/Boards/SortButton";
import PostList from "../../components/Boards/PostList";
// import PostItem from "./PostItem";

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { searchQuery } = route.params || {}; // 파라미터에서 searchQuery 받아옴

  useEffect(() => {
    if (searchQuery) {
      console.log("검색어:", searchQuery); // 검색어가 전달된 경우 콘솔에 출력 (또는 다른 처리)
      // 여기서 searchQuery를 사용하여 필요한 작업 수행
      // 예: API 요청, 필터링 등
      // 검색한거 일단 postList에 넘겨주기
    }
  }, [searchQuery]);
  return (
    <View style={styles.container}>
      <SearchButton />
      <View style={styles.OneRow}>
        <SortButton />
        <View style={styles.tabBarWrapper}>
          <ThreeTabBar />
        </View>
      </View>
      <PostList searchQuery={searchQuery} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 18,
  },
  OneRow: {
    flexDirection: "row", // 가로 방향으로 정렬
    alignItems: "center", // 수직 가운데 정렬
    justifyContent: "space-between", // 양쪽 끝으로 정렬
    marginBottom: 12, // 아래 여백 추가
  },
  tabBarWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default HomeScreen;
