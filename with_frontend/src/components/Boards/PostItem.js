// components/PostItem.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Style from "../../configs/Style.json";

const PostItem = ({
  title,
  type,
  author,
  time, // 생성날짜 를 변경
  profileImage,
  routeImage,
  description,
  onPress,
  currentMember,
  maxMember,
}) => {
  console.log(
    "{PostItem} / profileImage , routeImage :",
    profileImage,
    " , ",
    routeImage
  );
  // 시간 차이를 계산하는 함수
  const formatTimeDifference = (time) => {
    const now = new Date(); // 현재 시간
    const messageTime = new Date(time); // 메시지 시간이 `time` 파라미터로 전달됨

    const diffInMs = now - messageTime; // 현재 시간과 메시지 시간의 차이 (밀리초 단위)
    const diffInMinutes = Math.floor(diffInMs / 1000 / 60); // 분 단위로 변환
    const diffInHours = Math.floor(diffInMinutes / 60); // 시간 단위로 변환
    const diffInDays = Math.floor(diffInHours / 24); // 일 단위로 변환

    if (diffInMinutes < 1) {
      return "방금 전"; // 1분 미만일 때
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`; // 1시간 미만일 때
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`; // 24시간 미만일 때
    } else {
      return `${diffInDays}일 전`; // 1일 이상일 때
    }
  };

  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const updatedTime = formatTimeDifference(time); // time 포맷팅
    setFormattedTime(updatedTime); // 상태 업데이트
  }, [time]);

  // 로컬 기본 이미지 경로 설정
  const defaultImage = require("../../../assets/BoarderDummy.png"); // 기본 이미지 설정
  const defaultImage_profile = require("../../../assets/Sopia.png"); // 기본 이미지 설정
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View>
            <Image
              source={require("../../../assets/defaultProfile.png")}
              style={styles.profileImage}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",

            width: "85%",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
            {/* author를 같은 Column에 배치 */}
          </View>
          <Text>{type == 1 ? "소개글" : "모집글"}</Text>
        </View>
      </View>

      <View
        style={[
          styles.postImage,
          {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderRadius: 8,
          },
        ]}
      >
        {routeImage ? (
          <Image
            source={{ uri: routeImage }} // imageUrl이 없으면 로컬 이미지 사용
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Text style={{ fontSize: 24, color: "gray" }}>
            이미지가 없습니다.
          </Text>
        )}
      </View>

      <Text style={styles.description} numberOfLines={1}>
        {description}
      </Text>

      <View style={{ flexDirection: "row" }}>
        {/* 뷰 내부 컴포넌트 가로로 배치 */}
        <Text style={styles.time}>{formattedTime}</Text>
        <Text
          style={[styles.time, { flex: 1, textAlign: "right" }]}
        >{`${currentMember} / ${maxMember}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.APP_SECONDARY_COLOR,
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1, // 그림자 효과 (Android)
    shadowColor: "#000", // 그림자 색상 (iOS)
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋 (iOS)
    shadowOpacity: 0.1, // 그림자 투명도 (iOS)
    shadowRadius: 4, // 그림자 반경 (iOS)
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    color: "#666",
    fontSize: 14,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginVertical: 4,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
});

export default PostItem;
