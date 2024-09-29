import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 사용
import { SafeAreaView } from "react-native-safe-area-context"; // 안전 영역을 고려한 SafeAreaView

import SearchBar from "../../components/common/SearchBar";
import PlaceChoiceButton from "../../components/BoardCreate/PlaceChoiceButton";

// 초기 상태로 사용할 장소 데이터
const initialSeoulSearchPlace = [
  {
    //
    placeType: 2, //      관광명소
    placeName: "아산역", // 찐주소
    latitude: 36.7920561, // 위도 경도
    longitude: 127.1044621,
  },
  // {
  //   placeName: "남산타워",
  //   placeType: "관광명소",
  // },
  // {
  //   placeName: "롯데호텔",
  //   placeType: "숙소",
  // },
  // {
  //   placeName: "명동교자",
  //   placeType: "식당",
  // },
  // {
  //   placeName: "롯데월드",
  //   placeType: "관광명소",
  // },
];

const initialMyPlace = [
  {
    address: "충남 아산시 선문대학교", // 찐주소,,  // 이 찐주소는 메인에 안뜨네,,
    placeName: "선문대학교", // 내가 칭한 주소
    placeType: 1, // 나만의장소 타입
    latitude: 36.7989764,
    longitude: 127.0750025,
  },
  // {
  //   placeName: "탕정 지중해마을",
  //   placeType: "탕정에서 그나마 볼거리 있는 곳",
  // },
  // {
  //   placeName: "아산 레일바이크",
  //   placeType: "아산에서 그나마 자전거 탈수 있는 곳",
  // },
  // {
  //   placeName: "아산 이순신체육관",
  //   placeType: "운동장",
  // },
  // {
  //   placeName: "배방초등학교 운동장",
  //   placeType: "학교 운동장",
  // },
];

function SearchPlaceScreen() {
  const navigation = useNavigation();

  const { width } = useWindowDimensions(); // 화면의 너비를 가져옴
  const buttonWidth = Math.min(width * 0.2, 100); // 버튼의 최대 너비를 설정
  const imageWidth = Math.min(width * 0.5, 100); // 이미지의 최대 너비를 설정

  const [searchText, setSearchText] = useState(""); // 검색 텍스트를 관리하는 상태
  const [resultPlace, setResultPlace] = useState([]); // 검색 결과 장소 상태
  const [hasSearched, setHasSearched] = useState(false); // 검색 수행 여부 상태 추가

  const [myPlace, setMyPlace] = useState(initialMyPlace);

  // 검색 버튼 눌렀을 때 백엔드로 검색어 보내고 데이터 받아오기
  const handleSearchSubmit = async () => {
    console.log(searchText);
    setHasSearched(true); // 검색 버튼을 눌렀을 때 검색 수행 여부를 true로 설정

    // 백엔드 요청 searchText 가지고 가서  저장 후 보여주게 하기.

    setResultPlace(initialSeoulSearchPlace); // 임시로 검색 결과 설정 (실제 API 호출 필요)

    // 지금 더미데이터 넣어놈

    // 검색했는데 아무 결과 없을 때 resultPlace를 빈 배열로 설정
    if (searchText.trim() === "") {
      setResultPlace([]); // 검색어가 없을 때도 빈 배열로 설정
    }
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
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            onSubmit={handleSearchSubmit}
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
      {/* 검색 결과 보여주는 컨테이너 */}
      <ScrollView style={styles.searchResultContainer}>
        {hasSearched ? (
          resultPlace.length === 0 ? (
            // 검색 결과가 없을 때 표시
            <View style={styles.centeredView}>
              <Image
                source={require("../../../assets/notSearch.png")}
                style={[
                  styles.image,
                  { width: imageWidth, height: imageWidth },
                ]} // width와 height 동일하게 설정
              />
              <Text style={{ fontSize: 16 }}>검색 결과가 없습니다.</Text>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>
                나만의 장소를 추가할 수 있습니다.
              </Text>
              <TouchableOpacity
                style={[styles.insertButton, { width: buttonWidth }]}
                onPress={() => navigation.navigate("InsertMyPlaceScreen")}
              >
                <Text style={styles.buttonText}>추가</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // 검색 결과가 있을 때 표시
            resultPlace.map((place, index) => (
              <PlaceChoiceButton
                key={index} // 고유한 키 설정
                placeName={place.placeName} // placeName prop으로 전달
                placeType={place.placeType}
                onSelect={() => {
                  // 선택 버튼을 눌렀을 때 실행할 동작
                  console.log(`${place.placeName} 선택됨`);

                  navigation.navigate("MainBoardWriteScreen", {
                    latitude: place.latitude, /// 위도
                    longitude: place.longitude, // 경도
                    myPlaceName: place.placeName, //  나만의 장소 입력한 이름.
                    placeType: place.placeType, // 나만의 장소라는 장소타입.
                    // adressName 도로명 주소 안줘도 된다해서. 일단 안줌
                  });
                }}
              />
            ))
          )
        ) : (
          // 검색을 수행하기 전에는 아무것도 표시하지 않음
          <View style={{ height: 20 }}></View>
        )}
      </ScrollView>

      <Text style={styles.label}> 나만의 장소 </Text>
      <ScrollView style={styles.searchResultContainer}>
        {myPlace.map((place, index) => (
          <PlaceChoiceButton
            key={index} // 고유한 키 설정
            placeName={place.placeName} // placeName prop으로 전달
            placeType={place.placeType}
            onSelect={() => {
              // 선택 버튼을 눌렀을 때 실행할 동작
              console.log(`${place.placeName} 선택됨`);

              navigation.navigate("MainBoardWriteScreen", {
                latitude: place.latitude, /// 위도
                longitude: place.longitude, // 경도
                myPlaceName: place.placeName, //  나만의 장소 입력한 이름.
                placeType: 1, // 나만의 장소라는 장소타입.
                // adressName 도로명 주소 안줘도 된다해서. 일단 안줌
              });
              //
            }}
          />
        ))}
      </ScrollView>
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
    marginBottom: 16, // marginBottom 조정 (원래는 16)
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 8,
  },

  image: {
    resizeMode: "contain",
    marginBottom: 20,
  },

  insertButton: {
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
    borderRadius: 8,
    backgroundColor: "rgba(87, 117, 205, 1)",
    paddingVertical: 10,
    paddingHorizontal: 15, // 가로 여백을 줄여서 텍스트 크기에 맞추기
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
  },

  centeredView: {
    // flex: 1, //전체화면
    justifyContent: "center", // 세로 방향 가운데
    alignItems: "center",
  },
});

export default SearchPlaceScreen;
