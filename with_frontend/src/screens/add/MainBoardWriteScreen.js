import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import ThreeTabButton from "../../components/Boards/ThreeTabButton";
import InputTextField from "../../components/common/InputTextField";
import DateRangePicker from "../../components/BoardCreate/DateRangePicker";
import LongButton from "../../components/common/LongButton";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 가져오기
import moment from "moment";
import { useRoute } from "@react-navigation/native";

const MainBoardWriteScreen = () => {
  // 🔵 상태 관리
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

  const route = useRoute(); // Route 객체 사용하여 전달된 파라미터 받기
  const { latitude, longitude, myPlaceName, placeType } = route.params || {}; // 전달된 장소 정보

  // 4개를 받아서 해당 날짜에 저장.

  const [selectedDay, setSelectedDay] = useState(null); // 선택된 날짜 상태

  // 🔵 전달된 장소 정보를 선택된 날짜에 추가
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
      setPlans(
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

  // 🔵 날짜 선택 시 계획 목록을 초기화
  const handleDateChange = (newDates) => {
    setDates(newDates);

    if (newDates.startDate && newDates.endDate) {
      const initialPlans = getDateList(newDates.startDate, newDates.endDate);
      setPlans(initialPlans);
    }
  };

  // 🔵 날짜 범위(startDate와 endDate) 기반으로 날짜 목록 생성
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

  // 🔵 인원수 증가 함수
  const incrementPeople = () => {
    setNumberOfPeople((prev) => {
      const newNumber = parseInt(prev) || 0;
      return (newNumber + 1).toString();
    });
  };

  // 🔵 인원수 감소 함수
  const decrementPeople = () => {
    setNumberOfPeople((prev) => {
      const newNumber = parseInt(prev) || 0;
      return newNumber > 1 ? (newNumber - 1).toString() : "1";
    });
  };

  // 🔵 인원수 입력 변경 함수
  const handlePeopleChange = (text) => {
    // 숫자만 허용하고 빈 문자열도 허용
    if (/^\d*$/.test(text)) {
      setNumberOfPeople(text);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 🔵 제목 입력 필드 */}
        <InputTextField
          label="제목"
          placeholder="제목을 입력하시오."
          value={title}
          onChangeText={setTitle}
          labelStyle={styles.label}
        />

        {/* 🔵 글 종류 선택 및 인원수 입력 */}
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

        {/* 🔵 날짜 선택 */}
        <DateRangePicker onDateChange={handleDateChange} />

        {/* 🔵 일정 계획 (날짜별 장소 추가) */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {plans.map((item, index) => (
            <View key={index} style={styles.planContainer}>
              <Text style={styles.dateTitle}>
                {`${item.day} ${item.date} / ${item.dayOfWeek}`}
              </Text>
              {item.places.length > 0 ? (
                item.places.map((place, placeIndex) => (
                  <View key={placeIndex} style={styles.placeContainer}>
                    <Text style={styles.placeText}>
                      {/* 🔴 placeType에 따라 다른 문자열을 출력 */}
                      {`${place.order} . `}
                      {place.placeType === 1 && "나만의 장소 "}
                      {place.placeType === 2 && "관광명소 "}
                      {place.placeType === 3 && "숙소 "}
                      {place.placeType === 4 && "식당 "}
                      {/* 🔴 장소명 출력 */}
                      {` ${place.placeName}`}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noPlaceText}>
                  방문할 곳을 추가해주세요.
                </Text>
              )}
              {/* 🔵 장소 추가 버튼 */}
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

        {/* 🔵 작성 완료 버튼 */}
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
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
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
});

export default MainBoardWriteScreen;
