import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const recommendScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>앱 이름</Text>

        <Text style={styles.placeType}>
          {/* 상세설명 */}
          상세설명
        </Text>
      </View>

      <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
        <Text style={styles.selectButtonText}>선택</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // 가로로 정렬
    alignItems: "center", // 수직 정렬
    backgroundColor: "#F4F8FB", // 배경색 (하늘색 박스 느낌)
    padding: 10, // 내부 여백
    borderRadius: 10, // 모서리 둥글게
    margin: 10, // 아래 여백
    marginBottom: 0,

    shadowColor: "#000", // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경

    borderWidth: 1,
    borderColor: "#ccc",
  },
  infoContainer: {
    flex: 1, // 공간을 차지하게 설정
    justifyContent: "center", // 수직 가운데 정렬
  },
  placeName: {
    fontSize: 16,
    fontWeight: "semi-bold",
    color: "#000",
    marginBottom: 4, // 장소명과 장소 타입 사이 간격
  },
  placeType: {
    fontSize: 14,
    color: "#666",
  },
  selectButton: {
    backgroundColor: "#FFF", // 버튼 배경색
    borderColor: "#5079CB", // 테두리 색
    borderWidth: 1, // 테두리 두께
    borderRadius: 8, // 모서리 둥글게
    paddingVertical: 6, // 버튼 위아래 패딩
    paddingHorizontal: 12, // 버튼 좌우 패딩
  },
  selectButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    // fontFamily: "Inter, sans-serif",
    letterSpacing: 0.34,
  },
});
export default recommendScreen;
