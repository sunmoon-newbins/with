import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 가져오기
import moment from "moment";

const DayPlan = ({ startDate, endDate }) => {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기
  const [plans, setPlans] = useState([]);

  // 시작일과 종료일을 기반으로 날짜 리스트 생성
  useEffect(() => {
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

    if (startDate && endDate) {
      const initialPlans = getDateList(startDate, endDate);
      setPlans(initialPlans);
    }
  }, [startDate, endDate]);

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

  return (
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
              navigation.navigate("SearchPlaceScreen"); // 장소 검색 스크린으로 이동
            }}
          >
            <Text style={styles.addButtonText}>장소 추가</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 16,
  },
  planContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginHorizontal: 16,
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

export default DayPlan;
