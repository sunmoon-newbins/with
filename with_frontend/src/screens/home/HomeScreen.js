import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Touchable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import SearchButton from "../../components/common/SearchButton";
import SortButton from "../../components/Boards/SortButton";
import PostList from "../../components/Boards/PostList";
// import PostItem from "./PostItem";
import Toast from "react-native-toast-message"; // Toast 임포트
import ThreeTabButton from "../../components/Boards/ThreeTabButton";
import LongButton from "../../components/common/LongButton";

import axios from "axios";
import IPConfig from "../../configs/IPConfig.json";

function HomeScreen() {
  const { width } = useWindowDimensions(); // 화면의 너비를 가져옴
  const navigation = useNavigation();
  const route = useRoute();
  const { searchQuery, message } = route.params || {}; // 파라미터에서 searchQuery 받아옴
  const [activeIndex, setActiveIndex] = useState(0);

  const [postList, setPostList] = useState([]);

  console.log(message, "메시지");
  useEffect(() => {
    if (searchQuery) {
      console.log("검색어:", searchQuery); // 검색어가 전달된 경우 콘솔에 출력 (또는 다른 처리)
      // 여기서 searchQuery를 사용하여 필요한 작업 수행
      // 예: API 요청, 필터링 등
      // 검색한거 일단 postList에 넘겨주기
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: IPConfig.IP + `/routes?state=${activeIndex}&sortType=${0}`,
          headers: { "Content-Type": "application/json" },
        });

        if (response.data) {
          console.log(
            "{HomeScreen} / useEffect / fetchData ",
            response.data.length
          );
          setPostList(response.data);
        }
      } catch (error) {
        console.log("데이터 가져오기 실패3", error);
      }
    };

    fetchData();
  }, [activeIndex]);

  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: message, // 전달된 메시지를 표시
        position: "bottom",
        visibilityTime: 4000, // 메시지가 보일 시간 (밀리초)
      });
    }
  }, [message]);

  const tabs = [
    { title: "전체", isActive: activeIndex === 0 },
    { title: "소개", isActive: activeIndex === 1 },
    { title: "모집", isActive: activeIndex === 2 },
  ];

  return (
    <View style={styles.container}>
      <SearchButton />
      <View style={styles.OneRow}>
        <SortButton />
        <View style={styles.tabBarWrapper}>
          <View style={[styles.tabContainer, { maxWidth: width * 0.8 }]}>
            {tabs.map((tab, index) => (
              <ThreeTabButton
                key={index}
                title={tab.title}
                isActive={tab.isActive}
                // 버튼을 클릭하면 activeIndex를 현재 인덱스로 변경
                onPress={() => setActiveIndex(index)}
              />
            ))}
          </View>
        </View>
      </View>

      <LongButton
        title="추천 어플"
        buttonStyle={[
          {
            marginTop: 5,
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#5079CB",
          },
        ]}
        textStyle={{ color: "black", fontSize: 16 }}
        onPress={() => navigation.navigate("RecommendScreen")}
      />

      <PostList searchQuery={searchQuery} data={postList} />

      <TouchableOpacity
        style={{
          position: "absolute", // 절대 위치
          top: "95%", // 화면 맨 위에서 10px 만큼 떨어짐
          right: 10, // 화면 오른쪽 끝에 붙음
          zIndex: 1000, // 다른 콘텐츠 위에 표시되도록 zIndex를 높게 설정

          backgroundColor: "#fff", // 필요에 따라 추가
          borderRadius: 30, // 둥근 버튼을 만들기 위해 추가 (선택 사항)
        }}
        onPress={() => {
          navigation.navigate("AngelNavigator", { screen: "AngelScreen" });
        }}
      >
        <Image
          source={require("../../../assets/angel.png")}
          style={{
            width: 60,
            height: 60,
          }}
        />
      </TouchableOpacity>
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
  tabContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between", // 탭을 화면에 맞게 분배
    gap: 13,
  },
});

export default HomeScreen;
