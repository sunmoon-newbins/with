import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";

import SearchButton from "../../components/common/SearchButton";
import ThreeTabBar from "../../components/Boards/ThreeTabBar";
import SortButton from "../../components/Boards/SortButton";
import PostList from "../../components/Boards/PostList";
// import PostItem from "./PostItem";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchButton />
      <View style={styles.OneRow}>
        <SortButton />
        <View style={styles.tabBarWrapper}>
          <ThreeTabBar />
        </View>
      </View>
      <PostList />
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
