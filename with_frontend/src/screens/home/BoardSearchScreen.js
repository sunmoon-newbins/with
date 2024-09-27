import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 사용
import { SafeAreaView } from "react-native-safe-area-context"; // 안전 영역을 고려한 SafeAreaView

import SearchBar from "../../components/common/SearchBar";
import RecentSearchItem from "../../components/common/RecentSearchItem";

const recentSearches = ["서울", "부산", "제주", "아산", "충남", "경주"];

function BoardSearchScreen() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState(""); // 검색 텍스트를 관리하는 상태

  const handleSearchSubmit = () => {
    // goBack을 사용하면서 파라미터로 데이터 전달
    navigation.navigate({
      name: "HomeScreen", // 돌아갈 스크린 이름
      params: { searchQuery: searchText }, // 전달할 데이터
      merge: true, // 스크린이 이미 활성화된 경우 병합하도록 설정
      // 파라미터가 여러개인 경우
      // params: { sortBy: 'date', category: 'news', searchQuery: '서울' }
      // 즉, merge: true는 새로 전달한 searchQuery: '서울'만 추가하고, 기존의 sortBy와 category 파라미터는 그대로 유지합니다.
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* 상태바 설정 */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* 뒤로가기 버튼 및 검색바 컨테이너 */}
      <View style={styles.headerContainer}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("../../../assets/BackIcon.png")} // 뒤로가기 아이콘 경로 설정
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* 검색바 */}
        <View style={styles.searchBarWrapper}>
          <SearchBar value={searchText} onChangeText={setSearchText} />
        </View>
        {/* 검색 아이콘 */}
        <TouchableOpacity onPress={handleSearchSubmit}>
          <Image
            resizeMode="contain"
            source={require("../../../assets/Search.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      {/* 최근 검색어 컨테이너 */}
      <View style={styles.recentSearchContainer}>
        <Text style={styles.recentSearchTitle}>최근 검색</Text>
        <View style={styles.recentSearchItems}>
          {recentSearches.map((item, index) => (
            <RecentSearchItem key={index} text={item} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 0, // 기존에 있던 여백을 제거
    paddingTop: 0, // 상단 여백 제거
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10, //
    marginBottom: 0, // marginBottom 조정 (원래는 16)
  },
  backButton: {
    padding: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  searchBarWrapper: {
    flex: 1, // 검색바가 가능한 모든 공간을 차지하도록 설정
    marginHorizontal: 4,
    height: 40, // 높이 설정
  },
  searchIcon: {
    width: 24,
    height: 24,
    padding: 8,
  },
  recentSearchContainer: {
    paddingHorizontal: 16, // 전체 컨테이너에 좌우 여백 추가
    marginTop: 16,
  },
  recentSearchTitle: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  recentSearchItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8, // 아이템 간의 간격 설정
  },
});

export default BoardSearchScreen;
