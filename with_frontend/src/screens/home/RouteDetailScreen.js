import { View, Text, Image, ScrollView } from "react-native"; // ScrollView 추가
import React from "react";
import PostTop from "../../components/BoardDetails/PostTop"; // 최상단 이미지, 제목, 설명
import PostMiddle from "../../components/BoardDetails/PostMiddle";
// day , 장소 , 메모

const defaultImage = require("../../../assets/BoarderDummy.png");
const mapImage = require("../../../assets/mapExample.png");
const profileImage = require("../../../assets/Sopia.png");

// 나관숙식 1234
const posts = [
  {
    id: "1", // 게시글 아이디
    title: "바다 여행 루트 추천 해요",
    name: "이사벨라", // 이름
    image: defaultImage, // 사진
    currentMember: 5,
    maxMember: 10,
    // 내용
    description:
      "안녕하세요 먼 곳에서 오느라 고생많으셨어요. 제가 소개해드릴 여행지는 요즘 mz 들이 많이가는 여행지에요. 한국에 오신걸 환영해요~~ 한국에 오시면 제가 회 사드릴게요~~",
    authorImage: profileImage, // 프로필사진
    authorTalent: 4.5, // 달란트
    authorBoardCount: 3, // 게시글
    hitCount: 11, // 조회수
    heartCount: 1, // 좋아요
  },
];

const dummyPlans = [
  {
    date: "2024-09-29", // 날짜 (YYYY-MM-DD 형식)
    places: [
      // 해당 날짜에 추가된 장소 목록
      {
        order: 1, // 장소 순서 (추가된 순서대로 1, 2, 3... 증가)
        placeType: 1, // 장소 타입 (1: 나만의 장소)
        placeName: "서울시청", // 장소명
        latitude: 37.569195556037954,
        longitude: 126.9764956086874,
        addressName: "", // 장소의 주소명 (필요 시 추가)
        memo: "이곳은 내가 좋아하는 조용한 장소", // 메모
      },
      {
        order: 2, // 두 번째 장소
        placeType: 2, // 장소 타입 (2: 관광명소)
        placeName: "분수대", // 장소명
        latitude: 37.56572191237293,
        longitude: 126.97760537266731,
        addressName: "서울시 중구 남대문로", // 장소의 주소명
        memo: "", // 메모
      },
    ],
  },
  {
    date: "2024-09-30", // 날짜 (YYYY-MM-DD 형식)
    places: [
      {
        order: 1, // 장소 순서
        placeType: 3, // 장소 타입 (3: 숙소)
        placeName: "호텔신라", // 장소명
        latitude: 37.5555,
        longitude: 126.9999,
        addressName: "서울특별시 중구 동호로 249", // 장소의 주소명
        memo: "편안한 숙소", // 메모
      },
    ],
  },
];

const RouteDetailScreen = () => {
  const post = posts[0];
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* ScrollView로 수정 */}
      <PostTop
        image={post.image} // 변수들 넘겨줌 .
        title={post.title}
        description={post.description}
        maxMember={post.maxMember}
        currentMember={post.currentMember}
      />

      <PostMiddle plans={dummyPlans} />

      {/* 여기에 다른 컴포넌트와 정보도 추가 가능 */}
    </ScrollView>
  );
};

export default RouteDetailScreen;
