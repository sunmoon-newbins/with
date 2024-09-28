import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import SearchBar from "../../components/common/SearchBar";
import InputTextField from "../../components/common/InputTextField";
// import s

const InsertMyPlaceScreen = ({ navigation }) => {
  const [searchMyPlace, setSearchMyPlace] = useState("");

  const [myPlace, setMyPlace] = useState(""); // 비어있음.

  const handleSearchSubmit = async () => {
    console.log(searchMyPlace);

    // 지도에 내가 검색한 주소 쪽으로 가게,,,
  };
  return (
    <View style={styles.container}>
      {/* 커스텀 헤더 */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}
        >
          <Image
            source={require("../../../assets/BackIcon.png")}
            style={[{ width: 25, height: 25 }]}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나만의 장소 추가</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainBoardWriteScreen")}
          style={styles.headerRight}
        >
          <Text style={styles.headerText}>완료</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.paddingView}>
        {/* 메인 컨텐츠 영역 */}
        <View>
          <View style={styles.headerContainer}>
            {/* 검색바 */}
            <View style={styles.searchBarWrapper}>
              <SearchBar
                value={searchMyPlace}
                onChangeText={setSearchMyPlace}
                onSubmit={handleSearchSubmit}
                placeholder="주소 검색"
              />
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
        </View>

        <InputTextField
          label="나만의 장소 이름"
          placeholder="나만의 장소 이름을 입력하시오."
          value={myPlace}
          onChangeText={setMyPlace}
          labelStyle={styles.label} // 커스텀 label 스타일
        />

        {/* 지도 api 써서  */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paddingView: {
    paddingHorizontal: 18, // 양옆으로만
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    padding: 8,
  },
  searchBarWrapper: {
    flex: 1, // 검색바가 가능한 모든 공간을 차지하도록 설정
    marginHorizontal: 4,
    height: 40, // 높이 설정
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: ,
    marginTop: 10, //
    marginBottom: 16, // marginBottom 조정 (원래는 16)
  },
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerLeft: {
    width: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headerRight: {
    width: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 18,
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  // content: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  text: {
    fontSize: 16,
  },
});

export default InsertMyPlaceScreen;
