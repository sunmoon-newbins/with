import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Location from 'expo-location';  // expo-location 가져오기
import InputTextField from "../../components/common/InputTextField";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import googleApi from "../../configs/googleApi.json";
import MapView, { Marker } from "react-native-maps";
import useStore from "../../components/user/useStore";
import { SafeAreaView } from "react-native-safe-area-context";

const PublicWifiPlaceScreen = ({ navigation }) => {
  const loginId = useStore((state) => state.id); // 지금 로그인한 아이디
  const apiKey = googleApi.googleAPi;

  const [address, setAddress] = useState("");
  const [myPlaceName, setMyPlaceName] = useState("");
  const [latitude, setLatitude] = useState(35.1689); // 기본값 : 부산 백스코 위도
  const [longitude, setLongitude] = useState(129.1362); // 기본값 : 부산 백스코 경도  
  const [errorMsg, setErrorMsg] = useState(null); // 에러 메시지 상태

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // 위치 권한 요청
      if (status !== 'granted') {
        setErrorMsg('위치 권한이 거부되었습니다.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); // 현재 위치 가져오기
      setLatitude(location.coords.latitude); // 위도 업데이트
      setLongitude(location.coords.longitude); // 경도 업데이트

    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
          <Image source={require("../../../assets/BackIcon.png")} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공공 와이파이</Text>
        <TouchableOpacity
          onPress={() => {
            if (!myPlaceName || !address) {
              alert("장소 이름과 주소를 입력해주세요.");
            } else {
              navigation.navigate("MainBoardWriteScreen", {
                latitude: latitude,
                longitude: longitude,
                myPlaceName: myPlaceName,
                placeType: 1,
              });
            }
          }}
          style={styles.headerRight}
        >
          <Text style={styles.headerText}>연결</Text>
        </TouchableOpacity>
      </View>

      {/* GooglePlacesAutocomplete 컴포넌트 */}
      <GooglePlacesAutocomplete
        placeholder="공공 와이파이 위치 검색"
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
          container: { flex: 0, width: "100%", marginTop: 10 },
          textInputContainer: {
            width: "100%",
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 5,
            padding: 5,
          },
          listView: { backgroundColor: "white", position: "absolute", top: 50, zIndex: 1 },
        }}
        fetchDetails={true}
      />

      <View style={styles.paddingView}>
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
          >
            {/* 현 위치 마커 */}
            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              title="현위치"
              description={address}
              pinColor="blue"
            />
            {/* 해운대은혜의집 */}
            <Marker
              coordinate={{ latitude: 35.17448, longitude: 129.13259 }}
              title="해운대은혜의집"
              pinColor="red"  // 파란색 핀
            />

            {/* 부산시립미술관 */}
            <Marker
              coordinate={{ latitude: 35.1668, longitude: 129.1369 }}
              title="부산시립미술관"
              pinColor="red"  // 파란색 핀
            />

            {/* 우2동 종합시장 */}
            <Marker
              coordinate={{ latitude: 35.1704, longitude: 129.139}}
              title="우2동 종합시장"
              pinColor="red"  // 파란색 핀
            />

            {/* 센텀아동병원 앞 */}
            <Marker
              coordinate={{ latitude: 35.1676, longitude: 129.1403 }}
              title="센텀아동병원 앞"
              pinColor="red"  // 파란색 핀
            />

            {/* 우2동 행정복지센터 */}
            <Marker
              coordinate={{ latitude: 35.17108, longitude: 129.1397 }}
              title="우2동 행정복지센터"
              pinColor="red"  // 파란색 핀
            />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: { height: 60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f8f8f8", paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#e0e0e0" },
  headerLeft: { width: 50, justifyContent: "center", alignItems: "flex-start" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "bold", color: "#333" },
  headerRight: { width: 50, justifyContent: "center", alignItems: "flex-end" },
  headerText: { fontSize: 18, color: "#000000", fontWeight: "bold" },
  paddingView: { flex: 1, paddingHorizontal: 18 },
  mapContainer: { flex: 1, marginTop: 20, width: "100%", marginHorizontal: 0 },
  map: { flex: 1 },
});

export default PublicWifiPlaceScreen;
