import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import googleApi from "../../configs/IPConfig.json";

const SearchBarWithAutocomplete = ({ SearchLocation }) => {
  const apiKey = googleApi.googleAPi; // 여기에 Google Maps API 키를 입력하세요.

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="주소 검색"
        minLength={2} // 주소 검색에 필요한 최소 문자 수
        autoFocus={false} // 자동으로 포커스를 맞출지 여부
        returnKeyType={"search"} // 키보드에서 'search' 버튼으로 설정
        fetchDetails={true} // 주소의 세부 정보를 가져옴
        onPress={(data, details = null) => {
          console.log("data:", data); // 데이터 확인
          console.log("details:", details); // 세부 정보 확인
          // 'details'는 fetchDetails가 true일 때만 반환됩니다.
          if (details) {
            const { lat, lng } = details.geometry.location;
            const location = {
              latitude: lat,
              longitude: lng,
            };
            SearchLocation(location); // 부모 컴포넌트로 선택된 위도와 경도 전달
          }
        }}
        query={{
          key: apiKey, // API 키 설정
          language: "ko", // 언어 설정
          components: "country:kr", // 국가 설정 (한국)
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          predefinedPlacesDescription: styles.predefinedPlacesDescription,
        }}
        debounce={200} // 입력 지연 시간(ms)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    zIndex: 1, // 다른 요소 위에 표시되도록 설정
  },
  textInputContainer: {
    backgroundColor: "white",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    backgroundColor: "#f9f9f9",
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
  },
});

export default SearchBarWithAutocomplete;
