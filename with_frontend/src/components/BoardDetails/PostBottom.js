import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import LongButton from "../common/LongButton";

const PostBottom = ({
  profileImage,
  authorTalent,
  authorBoardCount,
  hitCount,
  heartCount,
  name,
  postId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(heartCount); // 초기값을 heartCount로 설정

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
        <Image
          source={{
            uri: profileImage || "https://example.com/default-profile.png",
          }}
          style={styles.profileImage}
        />

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
            {`좋아요 ${likeCount}`} {/* likeCount로 변경 */}
          </Text>
        </TouchableOpacity>
      </View>

      <LongButton title="여행 일정 참가하기" />
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
});

export default PostBottom;
