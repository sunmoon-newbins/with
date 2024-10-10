// 패딩과 마진의 차이
//  패딩은 내부공간 . 추울떄 안에를 따뜻하게해야한다.
//  마진은 외부공간 .

import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import useStore from "../../components/user/useStore";

const reviews = [
  {
    id: "1",
    name: "이사벨라",
    image: "https://randomuser.me/api/portraits/women/1.jpg", // 남성 이미지 대신 여성 이미지로 변경
    routeTitle: "부산 여행같이가요 ",
    rating: 3,
    date: "2024.09.20",
    review: "여행 정말 재미있었어요 다음에 또 뵈요!",
  },
  {
    id: "2",
    name: "옹오엔",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    routeTitle: "서울 관광명소 나들이 여행",
    rating: 5,
    date: "2024.09.20",
    review:
      "너무 재미있었습니다. 다음에 또 갈 수 있는 기회가 생긴다면 꼭 다시 가고 싶습니다.",
  },
  {
    id: "3",
    name: "리사",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    routeTitle: "수원화성 나들이 여행가요",
    rating: 4,
    date: "2024.09.20",
    review:
      "수원화성의 역사와 풍경이 너무 아름다웠어요. 꼭 다시 가보고 싶네요!",
  },
  {
    id: "4",
    name: "John",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    routeTitle: "wyd 참가자들 여행 저만믿고 따라와요",
    rating: 4,
    date: "2024.09.20",
    review:
      "여행 일정이 정말 잘 짜여 있었고, 가이드가 훌륭했어요. 강력 추천합니다!",
  },
];

const MyReview = () => {
  const id = useStore((state) => state.id); // 해당 id에 해당하는 후기 만 백엔드에서 갖고오면 됨.
  console.log(id);

  return (
    <ScrollView
      style={{ backgroundColor: "#ffffff", padding: 12 }}
      contentContainerStyle={{ paddingBottom: 20 }}
      // 패딩을 이렇게주넹,,
    >
      {reviews.map((review) => (
        <View key={review.id} style={styles.reviewContainer}>
          <View style={styles.reviewContent}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: review.image }}
                style={[styles.profileImage]}
              />
              <Text style={styles.name}>{review.name}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.rating,
                      index < review.rating
                        ? styles.filledStar
                        : styles.emptyStar,
                    ]}
                  >
                    {index < review.rating ? "★" : "☆"}
                    {/* 꽉 찬 별과 빈 별 구분 */}
                  </Text>
                ))}
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.routeTitle}>{review.routeTitle}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>

          {/* 이미지 스타일 추가 */}
          <View style={styles.reviewBox}>
            <Text style={styles.review}>{review.review}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filledStar: {
    color: "#FFD700", // 꽉 찬 별 색상 (황금색)
  },
  emptyStar: {
    color: "#D3D3D3", // 빈 별 색상 (회색)
  },
  reviewContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F4F8FB",
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1, // 그림자 효과 (Android)
    shadowColor: "#000", // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 (iOS)
    shadowOpacity: 0.1, // 그림자 투명도 (iOS)
    shadowRadius: 4, // 그림자 반경 (iOS)
  },
  reviewContent: {
    flexDirection: "row", // 이미지와 텍스트를 가로로 배치

    alignItems: "flex-start", // 세로 정렬을 가운데로 맞춤
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40, // 이미지 너비
    height: 40, // 이미지 높이
    borderRadius: 25, // 이미지의 둥근 모서리 (원형)
    marginRight: 10, // 텍스트와 이미지 사이의 여백
  },
  reviewText: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    marginTop: 6,
  },
  routeTitle: {
    marginLeft: 5,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  review: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewBox: {
    backgroundColor: "#FFFFFF", // 하얀 배경색
    padding: 10, // 내부 여백
    borderRadius: 8, // 둥근 모서리
    shadowColor: "#000", // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 (iOS)
    shadowOpacity: 0.1, // 그림자 투명도 (iOS)
    shadowRadius: 4, // 그림자 반경 (iOS)
    elevation: 2, // 그림자 효과 (Android)
    marginTop: 5, // 상단 여백
  },
  date: {
    marginRight: 5,
    marginTop: 16,
    fontSize: 12,
    color: "#999",
  },
  rating: {
    marginTop: 4,
    color: "#FFD700", // 별표 색상
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: "row", // 별을 가로로 나열
    justifyContent: "flex-end", // 별이 오른쪽에 맞춰지도록 정렬
  },
});

export default MyReview;
