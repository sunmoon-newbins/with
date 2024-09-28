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

const MainBoardWriteScreen = () => {
  // 상태 관리
  const [title, setTitle] = useState(""); // 제목
  const [activeTab, setActiveTab] = useState("모집"); // 글 종류
  const [numberOfPeople, setNumberOfPeople] = useState(""); // 인원수
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [plans, setPlans] = useState([]); // 일정 상태 관리

  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  // CustomDateRangePicker에서 날짜를 선택하면 상태를 업데이트하는 함수
  const handleDateChange = (newDates) => {
    setDates(newDates);

    if (newDates.startDate && newDates.endDate) {
      const initialPlans = getDateList(newDates.startDate, newDates.endDate);
      setPlans(initialPlans);
    }
  };

  // 날짜 범위(startDate와 endDate) 기반으로 날짜 목록 생성
  const getDateList = (start, end) => {
    const dates = [];
    let currentDate = moment(start);
    let dayCount = 1; // Day 1, Day 2 등의 카운트를 위한 변수
    while (currentDate.isSameOrBefore(end, "day")) {
      dates.push({
        day: `Day ${dayCount}`,
        date: currentDate.format("YYYY-MM-DD"),
        dayOfWeek: currentDate.format("ddd"), // 요일
        places: [], // 각 날짜별 장소 리스트
      });
      currentDate.add(1, "days");
      dayCount++;
    }
    return dates;
  };

  // 장소 추가 함수
  const addPlace = (date) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.date === date
          ? {
              ...plan,
              places: [
                ...plan.places,
                { 장소명: `장소 ${plan.places.length + 1}` }, // 임시 장소명
              ],
            }
          : plan
      )
    );
  };

  // 인원수 증가 함수
  const incrementPeople = () => {
    setNumberOfPeople((prev) => {
      const newNumber = parseInt(prev) || 0;
      return (newNumber + 1).toString();
    });
  };

  // 인원수 감소 함수
  const decrementPeople = () => {
    setNumberOfPeople((prev) => {
      const newNumber = parseInt(prev) || 0;
      return newNumber > 1 ? (newNumber - 1).toString() : "1";
    });
  };

  // 인원수 입력 변경 함수
  const handlePeopleChange = (text) => {
    // 숫자만 허용하고 빈 문자열도 허용
    if (/^\d*$/.test(text)) {
      setNumberOfPeople(text);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 제목 입력 */}
        <InputTextField
          label="제목"
          placeholder="제목을 입력하시오."
          value={title}
          onChangeText={setTitle}
          labelStyle={styles.label} // 커스텀 label 스타일
        />

        {/* 글 종류 선택 */}
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

        {/* 날짜 선택 */}
        <DateRangePicker onDateChange={handleDateChange} />

        {/* 일정 계획 (날짜별 장소 추가) */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {plans.map((item, index) => (
            <View key={index} style={styles.planContainer}>
              <Text style={styles.dateTitle}>
                {`${item.day} ${item.date} / ${item.dayOfWeek}`}
              </Text>

              {item.places.length > 0 ? (
                item.places.map((place, placeIndex) => (
                  <View key={placeIndex} style={styles.placeContainer}>
                    <Text
                      style={styles.placeText}
                    >{`장소명: ${place.장소명}`}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noPlaceText}>추가된 장소가 없습니다.</Text>
              )}

              {/* 장소 추가 버튼 */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  navigation.navigate("SearchPlaceScreen", {
                    onPlaceSelect: (newPlace) => addPlace(item.date),
                  }); // 장소 검색 스크린으로 이동
                }}
              >
                <Text style={styles.addButtonText}>장소 추가</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* 작성 완료 버튼 */}
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
    // borderWidth: 1,
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
    backgroundColor: "#f0f0f0",
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
});

export default MainBoardWriteScreen;
