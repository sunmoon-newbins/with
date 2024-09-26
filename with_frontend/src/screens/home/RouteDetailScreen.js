import { View, Text, Image, ScrollView } from "react-native"; // ScrollView 추가
import React from "react";
import PostTop from "../../components/BoardDetails/PostTop"; // 최상단 이미지, 제목, 설명

const defaultImage = require("../../../assets/BoarderDummy.png");
const mapImage = require("../../../assets/mapExample.png");
const profileImage = require("../../../assets/Sopia.png");

const posts = [
  {
    id: "1", // 게시글 아이디
    title: "바다 여행 루트 추천 해요",
    author: "이사벨라",
    image: defaultImage,
    description:
      "안녕하세요 먼 곳에서 오느라 고생많으셨어요. 제가 소개해드릴 여행지는 요즘 mz 들이 많이가는 여행지에요. 한국에 오신걸 환영해요~~ 한국에 오시면 제가 회 사드릴게요~~",
    dayOne: "2024.09.18",
    dayOne1Place: {
      day: 1,
      sequence: 1,
      placeType: "식당", // 장소 타입 (예: 식당, 관광명소, 숙소 등 )
      placeName: "담소바 식당", // 장소 이름
      placeDescription:
        "여기 짱맛있어요 진짜 최고 최고  여기 짱맛있어요 진짜 최고 최고 여기 짱맛있어요 진짜 최고 최고 ",
    },
    dayOne2Place: {
      day: 1,
      sequence: 2,
      placeType: "숙소", // 장소 타입 (예: 식당, 관광명소, 숙소 등 )
      placeName: "신라호텔", // 장소 이름
      placeDescription:
        "여기 진짜 잠 잘와요 최고 여기 진짜 잠 잘와요 최고 여기 진짜 잠 잘와요 최고 여기 진짜 잠 잘와요 최고",
    },
    dayOne3Place: {
      day: 1,
      sequence: 3,
      placeType: "관광명소", // 장소 타입 (예: 식당, 관광명소, 숙소 등 )
      placeName: "경복궁", // 장소 이름
      placeDescription:
        "여기는 완전 웅장해요 또 오고 싶어요 한국 정말 대단해요 최고최고 여기는 완전 웅장해요 또 오고 싶어요 한국 정말 대단해요 최고최고",
    },
    authorImage: profileImage,
    authorTalent: 4.5,
    authorBoardCount: 3,
    hitCount: 11,
    heartCount: 1,
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
      />

      {/* 여기에 다른 컴포넌트와 정보도 추가 가능 */}
    </ScrollView>
  );
};

export default RouteDetailScreen;
