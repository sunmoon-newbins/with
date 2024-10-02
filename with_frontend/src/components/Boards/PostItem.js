// components/PostItem.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Style from "../../configs/Style.json";

const PostItem = ({
  title,
  author,
  time,
  imageUrl,
  description,
  onPress,
  currentMember,
  maxMember,
}) => {
  // 로컬 기본 이미지 경로 설정
  const defaultImage = require("../../../assets/BoarderDummy.png"); // 기본 이미지 설정
  const defaultImage_profile = require("../../../assets/Sopia.png"); // 기본 이미지 설정
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Image
          //   source={{ uri: "https://example.com/profile.png" }} // 프로필 이미지 URL
          source={imageUrl ? { uri: imageUrl } : defaultImage_profile}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </View>
      {/* {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.postImage} />
      ) : null} */}
      <Image
        source={imageUrl ? { uri: imageUrl } : defaultImage} // imageUrl이 없으면 로컬 이미지 사용
        style={styles.postImage}
      />
      <Text style={styles.description}>{description}</Text>

      <View style={{ flexDirection: "row" }}>
        {/* 뷰 내부 컴포넌트 가로로 배치 */}
        <Text style={styles.time}>{time}</Text>
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
