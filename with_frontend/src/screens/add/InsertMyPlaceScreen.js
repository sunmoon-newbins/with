import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import InputTextField from "../../components/common/InputTextField";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import googleApi from "../../configs/googleApi.json";
import MapView, { Marker } from "react-native-maps";
import IPConfig from "../../configs/IPConfig.json";
import useStore from "../../components/user/useStore";
import axios from "axios";

const InsertMyPlaceScreen = ({ navigation }) => {
  const loginId = useStore((state) => state.id); // 지금 로그인한 아이디

  const apiKey = googleApi.googleAPi;

  // console.log("loginId: ", loginId);

  const [address, setAddress] = useState(""); // 주소 저장
  // const [searchMyPlace, setSearchMyPlace] = useState(""); // 검색어 저장
  const [myPlaceName, setMyPlaceName] = useState(""); // 장소 이름 저장
  const [latitude, setLatitude] = useState(37.5665); // 기본값 서울 위도
  const [longitude, setLongitude] = useState(126.978); // 기본값 서울 경도

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}
        >
          <Image
            source={require("../../../assets/BackIcon.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>나만의 장소 추가</Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              await axios.patch(`${IPConfig.IP}/users/${loginId}/places`, {
                placeName: myPlaceName, // 장소
                placeType: 1,
                roadAddress: address,
                address: address,
                latitude: latitude,
                longitude: longitude,
              });
              console.log("서버로 데이터 전송 성공!");
            } catch (error) {
              console.error("서버로 데이터 전송 실패 : ", error);
            } finally {
              navigation.navigate("MainBoardWriteScreen", {
                latitude: latitude,
                longitude: longitude,
                myPlaceName: myPlaceName,
                placeType: 1, // 나만의 장소
              });
            }
          }}
          style={styles.headerRight}
        >
          <Text style={styles.headerText}>완료</Text>
        </TouchableOpacity>
      </View>

      {/* GooglePlacesAutocomplete 컴포넌트 */}
      <GooglePlacesAutocomplete
        placeholder="주소 검색"
        onPress={(data, details = null) => {
          if (details) {
            setLatitude(details.geometry.location.lat);
            setLongitude(details.geometry.location.lng);
            setAddress(details.formatted_address);
          }
        }}
        query={{
          key: apiKey,
          language: "ko",
        }}
        styles={{
          container: {
            flex: 0,
            width: "100%",
            marginTop: 10,
            // paddingHorizontal: 20,
          },
          textInputContainer: {
            width: "100%",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 5,
            padding: 5,
          },
          listView: {
            backgroundColor: "white",
            position: "absolute",
            top: 50,
            zIndex: 1,
          },
        }}
        fetchDetails={true}
      />

      <View style={styles.paddingView}>
        {/* 장소 이름 입력 */}
        <InputTextField
          label="나만의 장소 이름"
          placeholder="나만의 장소 이름을 입력하시오."
          value={myPlaceName}
          onChangeText={setMyPlaceName}
          labelStyle={styles.label}
        />

        {/* 주소 표시 */}
        <Text style={styles.label}> 주소 </Text>
        <Text> {address}</Text>

        {/* MapView */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude, // 위도
              longitude: longitude, // 경도
              latitudeDelta: 0.01, // 확대 수준
              longitudeDelta: 0.01, // 확대 수준
            }}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={async (e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate; // 터치한 좌표 가져오기
              setLatitude(latitude);
              setLongitude(longitude);

              const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=ko`;
              try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.status === "OK") {
                  const formattedAddress = data.results[0].formatted_address;
                  setAddress(formattedAddress); // 주소 업데이트 . 역 지오코딩한거.
                } else {
                  console.error("Geocoding API 에러 :", data.status);
                }
              } catch (error) {
                console.error("API 요청오류 :", error);
              }
            }}
          >
            {/* 마커 추가 */}
            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              title="선택한 장소"
              description={address}
            />
          </MapView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
    textAlign: "center",
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
    fontWeight: "bold",
  },
  paddingView: {
    flex: 1,
    paddingHorizontal: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mapContainer: {
    flex: 1, // 부모 뷰의 남은 공간을 모두 차지하도록 설정
    marginTop: 20, // 위쪽 여백
    width: "100%",
    marginHorizontal: 0,
  },
  map: {
    flex: 1,
  },
});

export default InsertMyPlaceScreen;
