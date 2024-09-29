import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DatePicker from "react-native-date-ranges";
import moment from "moment"; // moment 라이브러리 추가
import "moment/locale/ko";

moment.locale("ko");

const CustomDateRangePicker = ({ onDateChange }) => {
  // 이 상태를 넘겨줄 것.
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  // 날짜가 변경될 때마다 상태 업데이트 및 상위 컴포넌트에 전달
  const handleDateChange = (dates) => {
    const newDates = {
      startDate: dates.startDate
        ? moment(dates.startDate, "YYYY/MM/DD").format("YYYY-MM-DD")
        : null,
      endDate: dates.endDate
        ? moment(dates.endDate, "YYYY/MM/DD").format("YYYY-MM-DD")
        : null,
    };
    setSelectedDates(newDates);
    onDateChange(newDates); // 상위 컴포넌트로 데이터 전달
  };

  console.log("커스텀데이트", selectedDates.startDate, selectedDates.endDate);

  // 커스텀 버튼 함수
  const customButton = (onConfirm) => (
    <Button
      onPress={onConfirm} // 확인 버튼을 누르면 선택된 날짜 확인
      title="확인"
      color="#5775CD" // 버튼 색상
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>여행 날짜</Text>

      {/* DatePicker 컴포넌트 사용 */}
      <DatePicker
        style={{ width: 350, height: 45 }}
        customStyles={{
          placeholderText: { fontSize: 18, color: "#a0a0a0" }, // placeholder 텍스트 스타일
          headerStyle: { backgroundColor: "#f8f8f8" }, // 헤더 스타일
          headerMarkTitle: { color: "#333", fontSize: 18 }, // 헤더의 타이틀 스타일
          headerDateTitle: { color: "#333", fontSize: 18 }, // 선택된 날짜 표시 스타일
          contentInput: { borderRadius: 10, borderColor: "#ccc" }, // 입력 필드 스타일
          contentText: { color: "#333", fontSize: 16 }, // 선택된 날짜 텍스트 스타일
        }}
        centerAlign
        allowFontScaling={false}
        placeholder={"출발날짜 → 종료날짜"} // 기본 placeholder 텍스트
        mode={"range"} // 날짜 범위 선택 모드
        // onConfirm={(dates) => {
        //   // 선택했던 시작일, 종료일
        //   console.log("dates", dates); // dates 객체의 구조 확인
        //   setSelectedDates({
        //     startDate: dates.startDate
        //       ? moment(dates.startDate, "YYYY/MM/DD").format("YYYY-MM-DD") // moment 객체를 YYYY-MM-DD 형식으로 변환 후 저장
        //       : null,
        //     endDate: dates.endDate
        //       ? moment(dates.endDate, "YYYY/MM/DD").format("YYYY-MM-DD") // moment 객체를 YYYY-MM-DD 형식으로 변환 후 저장
        //       : null,
        //   });
        //
        // }}
        onConfirm={handleDateChange} // 날짜 변경 시 handleDateChange 호출
        //
        customButton={customButton} // 커스텀 버튼 사용
        selectedBgColor="rgba(87, 117, 205, 1)" // 선택된 날짜의 배경색
        selectedTextColor="#FFF" // 선택된 날짜의 텍스트 색상
        calendarBgColor="rgba(244, 248, 251, 1)" // 캘린더의 배경색
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#FFF",
  //   padding: 20,
  // },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333",
  },
});

export default CustomDateRangePicker;
