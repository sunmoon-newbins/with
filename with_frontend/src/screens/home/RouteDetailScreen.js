import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native"; // ScrollView 추가
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PostTop from "../../components/BoardDetails/PostTop"; // 최상단 이미지, 제목, 설명
import PostMiddle from "../../components/BoardDetails/PostMiddle";
import PostBottom from "../../components/BoardDetails/PostBottom";
import route_detail_dummy from "../../../dummy_data/routeDetail.json";
import axios from "axios";
import IPConfig from '../../configs/IPConfig.json';
// day , 장소 , 메모

const RouteDetailScreen = (props) => {
  const [routeInfo, setRouteInfo] = useState();
  // const post = posts[0];
  const { routeId } = props.route.params; // postId를 받아옴


  const fetchData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: IPConfig.IP + `/routes/${routeId}`,
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        setRouteInfo(response.data);
        console.log("{RouteDetailScreen} useEffect / routeInfo = ", response.data);
      }
    } catch (error) {
      console.log("데이터 가져오기 실패3", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props]);

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* ScrollView로 수정 */}
      <PostTop
        image={routeInfo?.picture} // 변수들 넘겨줌 .
        title={routeInfo?.title}
        description={routeInfo?.content}
        maxMember={routeInfo?.participantCount}
        currentMember={routeInfo?.currentMember}
      />

      <PostMiddle plans={routeInfo?.routeByDay} />

      <PostBottom
        profileImage={routeInfo?.profile}
        authorTalent={routeInfo?.authorTalent}
        authorBoardCount={routeInfo?.authorBoardCount}
        hitCount={routeInfo?.hitCount}
        heartCount={routeInfo?.heartCount}
        name={routeInfo?.name}
        routId={routeInfo?.routeId}
        currentMember={routeInfo?.currentMember} // 둘이 같으면 버튼 비활성화 .
        maxMember={routeInfo?.participantCount}
      />

      {/* 여기에 다른 컴포넌트와 정보도 추가 가능 */}
    </ScrollView>
  );
};

export default RouteDetailScreen;
