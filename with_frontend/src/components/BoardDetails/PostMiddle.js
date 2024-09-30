import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

const PostMiddle = ({ plans }) => {
  const [statePlans, setStatePlans] = useState(plans);
  const mapRefs = useRef([]); // 각 MapView에 대해 별도의 ref 생성

  console.log("제이슨", JSON.stringify(statePlans, null, 2)); // null을 전달하면 모든 속성을 변환

  return (
    <ScrollView>
      {statePlans.map((item, index) => (
        <View key={index} style={styles.dateContainer}>
          {/* 날짜 표시 */}
          <Text style={styles.dateText}>{`Day ${index + 1} | ${
            item.date
          }`}</Text>

          {/* 지도 표시 */}
          <View style={styles.mapContainer}>
            <MapView
              ref={(ref) => {
                mapRefs.current[index] = ref; // 각 MapView에 대해 별도의 ref 할당
              }}
              style={styles.map}
              onLayout={() => {
                if (item.places.length > 0) {
                  const coordinates = item.places.map((place) => ({
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }));

                  if (item.places.length === 1) {
                    // 장소가 하나인 경우 확대 수준을 0.1로 고정
                    mapRefs.current[index].animateToRegion(
                      {
                        latitude: item.places[0].latitude,
                        longitude: item.places[0].longitude,
                        latitudeDelta: 0.01, // 확대 수준 고정
                        longitudeDelta: 0.01, // 확대 수준 고정
                      },
                      500 // 애니메이션 시간
                    );
                  } else {
                    // 장소가 두 개 이상일 경우 fitToCoordinates 호출
                    mapRefs.current[index].fitToCoordinates(coordinates, {
                      edgePadding: {
                        top: 50,
                        right: 50,
                        bottom: 50,
                        left: 50,
                      },
                      animated: true,
                    });
                  }
                }
              }}
            >
              {item.places.map((place, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                  }}
                  title={`장소 ${place.order}`}
                  description={place.placeName}
                >
                  {/* Custom Marker */}
                  <View
                    style={[
                      styles.marker,
                      {
                        backgroundColor:
                          place.placeType === 1
                            ? "#5775CD" // 나만의 장소
                            : place.placeType === 2
                            ? "#B6FFB6" // 관광명소
                            : place.placeType === 3
                            ? "#D9B6FF" // 숙소
                            : "#FFB6B6", // 식당
                      },
                    ]}
                  >
                    <Text style={styles.markerText}>{place.order}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>

          {/* 장소 목록 표시 */}
          {item.places.map((place, placeIndex) => (
            <View key={placeIndex} style={styles.placeContainer}>
              {/* 핀 디자인 */}
              <View
                style={[
                  styles.pinContainer,
                  {
                    backgroundColor:
                      place.placeType === 1
                        ? "#5775CD" // 나만의 장소
                        : place.placeType === 2
                        ? "#B6FFB6" // 관광명소
                        : place.placeType === 3
                        ? "#D9B6FF" // 숙소
                        : "#FFB6B6", // 식당
                  },
                ]}
              >
                {/* 동그라미 안에 하얀색 번호 */}
                <Text style={styles.pinText}>{place.order}</Text>
              </View>

              <View style={styles.placeInfoContainer}>
                <Text style={styles.placeText}>
                  {/*  placeType에 따라 다른 문자열을 출력 */}
                  {place.placeType === 1 && "나만의 장소 "}
                  {place.placeType === 2 && "관광명소 "}
                  {place.placeType === 3 && "숙소 "}
                  {place.placeType === 4 && "식당 "}
                  {/*  장소명 출력 */}
                  {` ${place.placeName}`}
                </Text>
                {/* 메모가 있으면 아래에 표시 */}
                {place.memo ? (
                  <Text style={styles.memoText}>{place.memo}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};
// 스타일 정의
const styles = StyleSheet.create({
  dateContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  placeContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeOrder: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "red",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  memoText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  noMemoText: {
    marginTop: 5,
    fontSize: 14,
    color: "#aaa",
  },
  mapContainer: {
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
  pinContainer: {
    width: 35, // 핀의 크기
    height: 35, // 핀의 크기
    borderRadius: 20, // 핀을 동그랗게
    justifyContent: "center", // 가운데 정렬
    alignItems: "center", // 가운데 정렬
    marginRight: 10, // 핀과 텍스트 간격
  },
  pinText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  placeInfoContainer: {
    flex: 1, // 장소 정보가 핀 옆에 맞게 배치되도록
  },
  memoText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});

export default PostMiddle;
