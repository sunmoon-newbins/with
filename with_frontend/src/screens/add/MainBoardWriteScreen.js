import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import ThreeTabButton from "../../components/Boards/ThreeTabButton";
import InputTextField from "../../components/common/InputTextField";
import DateRangePicker from "../../components/BoardCreate/DateRangePicker";
import LongButton from "../../components/common/LongButton";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 가져오기
import moment from "moment";
import { useRoute } from "@react-navigation/native";

import MapView, { Marker } from "react-native-maps";
import { Swipeable } from "react-native-gesture-handler"; //

const MainBoardWriteScreen = () => {
  //  상태 관리
  // 제목, 글 종류, 인원수 등의 상태를 관리
  const [title, setTitle] = useState(""); // 제목
  const [activeTab, setActiveTab] = useState("모집"); // 글 종류
  const [numberOfPeople, setNumberOfPeople] = useState(""); // 인원수
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [plans, setPlans] = useState([]);
  console.log(JSON.stringify(plans, null, 2));

  // placeType 1 나만의장소
  // placeType 2 관광명소
  // placeType 3 숙소
  // placeType 4 식당

  // plans 하나에 [ places 장소
  //   {
  //     day: "Day 1", // Day 1, Day 2 등으로 구분
  //     date: "2024-09-29", // 날짜 (YYYY-MM-DD 형식)
  //     dayOfWeek: "Mon", // 요일 (Mon, Tue 등)
  //     places: [ // 해당 날짜에 추가된 장소 목록
  //       {
  //         order: 1, // 장소 순서 (추가된 순서대로 1, 2, 3... 증가)
  //         placeType: 1, // 장소 타입 (1: 나만의 장소, 2: 식당 등)
  //         placeName: "나만의 장소", // 장소명 (나만의 장소, 특정 장소명 등)
  //         latitude: 37.5665, // 장소의 위도
  //         longitude: 126.978, // 장소의 경도
  //         addressName: "" // 장소의 주소명 (필요 시 추가)
  //       },
  //       {
  //         order: 2, // 두 번째 장소
  //         placeType: 2, // 장소 타입 (2: 식당)
  //         placeName: "스타벅스", // 장소명
  //         latitude: 37.5667,
  //         longitude: 126.9781,
  //         addressName: "서울시 중구 남대문로" // 주소명
  //       }
  //       // ... 추가적인 장소들
  //     ]
  //   },
  //   { day 2 ~~~ }
  //  ]

  const route = useRoute(); // Route 객체 사용하여 전달된 파라미터 받기
  const { latitude, longitude, myPlaceName, placeType } = route.params || {}; // 전달된 장소 정보

  // 4개를 받아서 해당 날짜에 저장.

  const [selectedDay, setSelectedDay] = useState(null); // 선택된 날짜 상태

  //  지도 보기 상태 관리
  const [mapVisible, setMapVisible] = useState(false); // 처음엔 안보이게 .
  //  선택된 계획 상태 관리
  const [selectedPlan, setSelectedPlan] = useState(null);

  // 삭제함수
  const handleDeletePlace = (planIndex, placeIndex) => {
    // 삭제 날짜 인덱스, 삭제장소  인덱스
    setPlans(
      (
        prevPlans // 원래 있던 변수에서
      ) =>
        prevPlans.map(
          (
            plan,
            i // plan 날짜  , i 인덱스
          ) =>
            i === planIndex // 삭제할 장소가 속한 날짜인지 확인 . 인덱스를 ..
              ? {
                  ...plan, // 기존 날짜(plan)의 다른 정보는 그대로 유지하고,
                  places: plan.places // place 중에서
                    .filter((_, index) => index !== placeIndex) // 선택한 장소 삭제   // 인덱스랑 맞지않는것만 남겨놓는다. 인덱스 맞는건 사라지는거.
                    // 매개변수를 무시하기 위해 관습적으로 _(언더스코어)
                    .map((place, index) => ({
                      ...place,
                      order: index + 1, // 1부터 새로운 순서로 설정
                    })),
                }
              : plan
        )
    );
  };
  // 👆 여기다 넣으면 돼!

  // 나머지 컴포넌트 로직...

  //  전달된 장소 정보를 선택된 날짜에 추가
  useEffect(() => {
    if (latitude && longitude && myPlaceName && placeType && selectedDay) {
      console.log(
        "새 정보 들어올 때 ",
        latitude,
        longitude,
        myPlaceName,
        placeType,
        selectedDay
      );
      +setPlans(
        (
          prevPlans // 이전거에 원래있던거에 date 랑 selectedDay 랑  일치하면
        ) =>
          prevPlans.map(
            (plan) =>
              plan.date === selectedDay // 선택된 날짜와 일치할 때만 장소 추가
                ? {
                    ...plan, // 이전 내용 그대로 유지 .
                    places: [
                      ...plan.places, // 기존 장소 내용 유지 .
                      {
                        order: plan.places.length + 1, // 장소 순서 자동 증가
                        placeType: placeType, // 장소 타입 (1: 나만의 장소, 2: 식당 등)
                        placeName: myPlaceName, // 장소명 설정
                        latitude: latitude, // 위도
                        longitude: longitude, // 경도
                        addressName: "", // 필요 시 주소명 추가
                      },
                    ],
                  }
                : plan // 일치하지 않는 날짜는 그대로 유지
          )
      );
      setSelectedDay(null); // 선택된 날짜 초기화
    }
  }, [latitude, longitude, myPlaceName, placeType]); // 날짜 변경될떄 또 실행되면 x

  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  const handleShowMap = (plan) => {
    setSelectedPlan(plan);
    setMapVisible(true);
  };

  const handleHideMap = () => {
    setMapVisible(false);
    setSelectedPlan(null);
  };

  // 날짜 선택 시 계획 목록을 초기화
  const handleDateChange = (newDates) => {
    setDates(newDates);

    if (newDates.startDate && newDates.endDate) {
      const initialPlans = getDateList(newDates.startDate, newDates.endDate);
      setPlans(initialPlans);
    }
  };

  //  날짜 범위(startDate와 endDate) 기반으로 날짜 목록 생성
  // 각 날짜별로 day, date, dayOfWeek, places(장소 리스트)를 초기화
  const getDateList = (start, end) => {
    const dates = [];
    let currentDate = moment(start);
    let dayCount = 1;
    while (currentDate.isSameOrBefore(end, "day")) {
      dates.push({
        day: `Day ${dayCount}`,
        date: currentDate.format("YYYY-MM-DD"),
        dayOfWeek: currentDate.format("ddd"), // 요일
        places: [], // 각 날짜별 장소 리스트 초기화
      });
      currentDate.add(1, "days");
      dayCount++;
    }
    return dates;
  };

  //  인원수 증가 함수
  const incrementPeople = () => {
    setNumberOfPeople((prev) => {
      const newNumber = parseInt(prev) || 0;
      return (newNumber + 1).toString();
    });
  };

  //  인원수 감소 함수
  const decrementPeople = () => {
    setNumberOfPeople((prev) => {
      const newNumber = parseInt(prev) || 0;
      return newNumber > 1 ? (newNumber - 1).toString() : "1";
    });
  };

  //  인원수 입력 변경 함수
  const handlePeopleChange = (text) => {
    // 숫자만 허용하고 빈 문자열도 허용
    if (/^\d*$/.test(text)) {
      setNumberOfPeople(text);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 제목 입력 필드 */}
        <InputTextField
          label="제목"
          placeholder="제목을 입력하시오."
          value={title}
          onChangeText={setTitle}
          labelStyle={styles.label}
        />

        {/*  글 종류 선택 및 인원수 입력 */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>글 종류</Text>
          <Text style={styles.labelPeople}>인원수</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.tabContainer}>
            <ThreeTabButton
              title="소개"
              isActive={activeTab === "소개"}
              onPress={() => setActiveTab("소개")}
            />
            <ThreeTabButton
              title="모집"
              isActive={activeTab === "모집"}
              onPress={() => setActiveTab("모집")}
            />
          </View>

          <View style={styles.peopleContainer}>
            <TouchableOpacity
              style={[styles.peopleButton, styles.activeTabButton]}
              onPress={decrementPeople}
            >
              <Text style={styles.peopleButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.peopleInput}
              keyboardType="number-pad"
              value={numberOfPeople}
              onChangeText={handlePeopleChange}
              placeholder="인원"
              placeholderTextColor="#9094B8" // 인원이 비어있을 때 표시되는 색상
            />
            <TouchableOpacity
              style={[styles.peopleButton, styles.activeTabButton]}
              onPress={incrementPeople}
            >
              <Text style={styles.peopleButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*  날짜 선택 */}
        <DateRangePicker onDateChange={handleDateChange} />

        {/*  일정 계획 (날짜별 장소 추가) */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {plans.map((item, index) => (
            <View key={index} style={styles.planContainer}>
              <Text style={styles.dateTitle}>
                {`${item.day} ${item.date} / ${item.dayOfWeek}`}
              </Text>

              {/*  Day 아래에 지도 보기 버튼 추가 */}
              {item.places.length > 0 && (
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => handleShowMap(item)} // 현재 일정을 기반으로 지도 보기
                >
                  <Text style={styles.mapButtonText}>지도로 보기</Text>
                </TouchableOpacity>
              )}

              {/*  선택된 Day에 해당하는 장소의 지도 표시 */}
              {mapVisible && selectedPlan?.date === item.date && (
                <View style={styles.mapContainer}>
                  <MapView
                    ref={(ref) => {
                      // 이걸로 지도를 "참조"
                      this.mapRef = ref;
                    }}
                    style={styles.map}
                    onLayout={() => {
                      if (selectedPlan.places.length > 0) {
                        const coordinates = selectedPlan.places.map(
                          (place) => ({
                            latitude: place.latitude,
                            longitude: place.longitude,
                          })
                        );

                        // 먼저 여백을 설정하면서 fitToCoordinates 호출
                        this.mapRef.fitToCoordinates(coordinates, {
                          edgePadding: {
                            top: 50,
                            right: 50,
                            bottom: 50,
                            left: 50,
                          },
                          animated: true,
                        });

                        // 확대 수준을 제한하기 위한 계산
                        const latitudes = coordinates.map(
                          (coord) => coord.latitude
                        );
                        const longitudes = coordinates.map(
                          (coord) => coord.longitude
                        );

                        const maxLatitude = Math.max(...latitudes);
                        const minLatitude = Math.min(...latitudes);
                        const maxLongitude = Math.max(...longitudes);
                        const minLongitude = Math.min(...longitudes);

                        const latitudeDelta = maxLatitude - minLatitude;
                        const longitudeDelta = maxLongitude - minLongitude;

                        // 최소 확대 수준을 0.01로 제한
                        if (latitudeDelta < 0.01 || longitudeDelta < 0.01) {
                          const limitedLatitudeDelta = Math.max(
                            latitudeDelta,
                            0.01
                          );
                          const limitedLongitudeDelta = Math.max(
                            longitudeDelta,
                            0.01
                          );

                          this.mapRef.animateToRegion(
                            {
                              latitude: (maxLatitude + minLatitude) / 2,
                              longitude: (maxLongitude + minLongitude) / 2,
                              latitudeDelta: limitedLatitudeDelta,
                              longitudeDelta: limitedLongitudeDelta,
                            },
                            500
                          ); // 애니메이션 적용
                        }
                      }
                    }}

                    // initialRegion={{
                    //   latitude: selectedPlan.places[0].latitude, // 첫 장소의 위도
                    //   longitude: selectedPlan.places[0].longitude, // 첫 장소의 경도
                    //   latitudeDelta: 0.05, // 지도의 확대 수준
                    //   longitudeDelta: 0.05, // 지도의 확대 수준
                    // }}
                  >
                    {selectedPlan.places.map((place, index) => (
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
                  {/* 지도 닫기 버튼 추가 */}
                  <TouchableOpacity
                    style={styles.closeMapButton}
                    onPress={handleHideMap}
                  >
                    <Text style={styles.closeMapButtonText}>닫기</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* 장소 하나하나 컴포넌트  */}
              {item.places.length > 0 ? (
                item.places.map((place, placeIndex) => (
                  <Swipeable
                    key={placeIndex}
                    renderRightActions={() => (
                      <TouchableOpacity
                        onPress={() => handleDeletePlace(index, placeIndex)} // 스와이프 삭제 기능
                        // style={styles.deleteButton} // 삭제 버튼 스타일
                      >
                        <Image
                          source={require("../../../assets/XButton.png")}
                          style={{ width: 50, height: 50, marginBottom: 10 }}
                        />
                      </TouchableOpacity>
                    )}
                  >
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
                      </View>
                    </View>
                  </Swipeable>
                ))
              ) : (
                <Text style={styles.noPlaceText}>
                  방문할 곳을 추가해주세요.
                </Text>
              )}
              {/*  장소 추가 버튼 */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setSelectedDay(item.date); // 현재 클릭된 날짜를 selectedDay로 설정
                  navigation.navigate("SearchPlaceScreen"); // 장소 검색 스크린으로 이동
                }}
              >
                <Text style={styles.addButtonText}>장소 추가</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/*  작성 완료 버튼 */}
        <LongButton title="작성 완료" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  labelPeople: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginRight: 95,
  },
  labelContainer: {
    flexDirection: "row", // 가로로 배치
    justifyContent: "space-between", // 공간을 양쪽 끝으로 분배
    marginBottom: 8, // 라벨 아래 공간
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    gap: 10,
  },
  peopleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  peopleButton: {
    borderColor: "rgba(232, 232, 232, 1)",
    borderRadius: 8,
    backgroundColor: "rgba(244, 248, 251, 1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "rgba(87, 117, 205, 1)", // ThreeTabButton의 activeTabButton 스타일과 동일하게 설정
    borderColor: "rgba(87, 117, 205, 1)", // 테두리 색상도 동일하게 설정
  },
  peopleButtonText: {
    fontSize: 18,
    color: "#FFF", // activeTabButtonText 스타일과 동일하게 설정
    fontWeight: "bold",
  },
  peopleInput: {
    width: 50, // 입력 필드 너비를 조금 더 넓게 변경
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#F4F8FB",
  },
  planContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#F4F8FB",
    borderRadius: 8,
    marginHorizontal: 0,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#5775CD",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  placeContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row", // 핀과 장소 정보를 가로로 배치
    alignItems: "center",
    marginBottom: 8,
    padding: 8,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pinContainer: {
    width: 35, // 핀의 크기
    height: 35, // 핀의 크기
    borderRadius: 20, // 핀을 동그랗게
    justifyContent: "center", // 가운데 정렬
    alignItems: "center", // 가운데 정렬
    marginRight: 10, // 핀과 텍스트 간격
  },
  placeInfoContainer: {
    flex: 1, // 장소 정보가 핀 옆에 맞게 배치되도록
  },
  pinText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  placeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  noPlaceText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 8,
  },
  placeSummaryContainer: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  placeSummaryText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  placeItemText: {
    fontSize: 14,
    marginLeft: 8,
  },
  // 🔺 지도 스타일 추가
  mapContainer: {
    height: 250, // 원하는 높이 설정
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  // 🔺 Custom Marker 스타일 추가
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
  // 🔺 지도 닫기 버튼 스타일 추가
  closeMapButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
  closeMapButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  // 🔺 지도 보기 버튼 스타일 추가
  mapButton: {
    backgroundColor: "#e6e6e6",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 12,
  },
  mapButtonText: {
    color: "#333",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "red", // 삭제 버튼 배경색
    justifyContent: "center", // 가운데 정렬
    alignItems: "center",
    width: 80, // 버튼 너비
  },
  deleteButtonText: {
    color: "white", // 텍스트 색상
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MainBoardWriteScreen;
