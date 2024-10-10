// 여행 일정참가하기 눌렀을 시
// 채팅방 생성 ..
// 일단 홈화면으로 이동,, 채팅바텀탭 위에 채팅방이 생성되었다고 표시..

// 프로필 사진 눌렀을시 해당 프로필 상세화면으로 이동

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 추가
import LongButton from "../common/LongButton";

const PostBottom = ({
  profileImage,
  authorTalent,
  authorBoardCount,
  hitCount,
  heartCount,
  name,
  postId,
  currentMember,
  maxMember,
}) => {
  console.log("하트카운트: ", heartCount);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(heartCount); // 초기값을 heartCount로 설정
  const isFull = currentMember >= maxMember; // 조건: 멤버가 꽉 찼을 때

  const navigation = useNavigation(); // 네비게이션 객체 가져오기
  // 좋아요 버튼 눌렀을 때 실행되는 함수
  const handleLikePress = () => {
    setIsLiked(!isLiked); // 좋아요 상태 토글
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1); // 좋아요 카운트 업데이트
  };

  // 좋아요 상태 변경 시 백엔드로 데이터를 전송
  //   useEffect(() => {
  //     const sendLikeStatusToServer = async () => {
  //       try {
  //         const response = await fetch("https://your-backend-api.com/like", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             postId,
  //             isLiked,
  //           }),
  //         });
  //         const data = await response.json();
  //         console.log("서버로 전송된 좋아요 상태:", data);
  //       } catch (error) {
  //         console.error("좋아요 상태 전송 중 오류 발생:", error);
  //       }
  //     };

  //     if (postId) {
  //       sendLikeStatusToServer();
  //     }
  //   }, [isLiked]); // likeCount는 제외

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
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

        <View>
          <Text style={[styles.postBottmText, { paddingTop: 4 }]}>{name}</Text>
          <Text style={styles.postBottmText}>
            {`달란트 ${authorTalent} | 게시글 ${authorBoardCount}`}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.postBottmText}>{`조회수 ${hitCount}`}</Text>

        {/* 좋아요 버튼 */}
        <TouchableOpacity onPress={handleLikePress}>
          <Text
            style={[
              styles.postBottmText,
              { opacity: isLiked ? 0.9 : 0.4 }, // 좋아요 상태에 따라 opacity 변화
            ]}
          >
            {`좋아요 ${heartCount}`} {/* likeCount로 변경 */}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 해당 채팅방으로 화면이 넘어가져야함.  */}

      <LongButton
        title="여행 일정 참가하기"
        onPress={
          isFull
            ? null // 비활성화된 경우 아무 동작 안함
            : () => {
                navigation.navigate("HomeScreen", {
                  message: "채팅방이 생성되었습니다.",
                }); // 활성화된 경우 홈 화면으로 이동
                // 되면서 채팅 창위에
                // 채팅방이 생성되었습니다.
              }
        }
        buttonStyle={isFull ? styles.disabledButton : styles.activeButton} // 버튼 색상 설정
        textStyle={isFull ? styles.disabledText : styles.activeText} // 텍스트 스타일 설정
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileImage: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postBottmText: {
    fontWeight: "800",
    opacity: 0.4,
  },
  disabledText: {
    color: "lightgray", // 비활성화된 텍스트 색상
  },
  disabledButton: {
    backgroundColor: "gray", // 비활성화된 버튼 색상
  },
});

export default PostBottom;
