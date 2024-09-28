import React, { useState } from "react";
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
import DayPlan from "../../components/BoardCreate/DayPlan";
// 날짜가져가게.
import LongButton from "../../components/common/LongButton"; // 롱버튼

const MainBoardWriteScreen = () => {
  // 상태 관리
  const [title, setTitle] = useState(""); // 제목
  const [activeTab, setActiveTab] = useState("모집"); // 글 종류
  const [numberOfPeople, setNumberOfPeople] = useState(""); // 인원수
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  // CustomDateRangePicker에서 날짜를 선택하면 상태를 업데이트하는 함수
  const handleDateChange = (newDates) => {
    setDates(newDates);

    console.log("여기서 적용이 안됨 ㅋㅋㅋㅋ ", dates.startDate, dates.endDate);
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
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
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
        <DateRangePicker onDateChange={handleDateChange} />
        {/* 시작날 종료날 */}
        <DayPlan startDate={dates.startDate} endDate={dates.endDate} />
        {/* 받은거 바로 얘한테 줘서 쓸 수 있게. */}

        <LongButton title="작성 완료" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContentContainer: {
    flexGrow: 1, //
    paddingBottom: 20,
  },
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
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
});

export default MainBoardWriteScreen;
