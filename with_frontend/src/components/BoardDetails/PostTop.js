import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 가져오기

const PostTop = ({ image, title, description, currentMember, maxMember }) => {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  return (
    <View style={styles.container}>
      {/* 상단 이미지 영역 */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeftButton}
        >
          <Image
            source={require("../../../assets/BackIcon.png")} // 나가기(뒤로가기) 아이콘의 경로에 맞게 수정
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
      {/* 내용 영역 */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.memberCount}
        >{`${currentMember} / ${maxMember}`}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.horizontalLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // 하얀색
  },
  imageContainer: {
    position: "relative", //상대적인 absolute
    height: 300, // 이미지 높이 설정
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // 이미지가 잘리지 않고 채워지도록 설정 stretch 는 사진이 맞춰짐
  },
  headerLeftButton: {
    position: "absolute", // 절대 위치로 설정하여 이미지 위에 겹치도록 함
    top: 40, // 안전 영역을 감안한 위치 조정 (SafeAreaVie+w 포함)
    left: 16,
    zIndex: 1, // 이미지 위에 표시되도록 z-index 설정 z값 1만줘도됨.
  },
  headerIcon: {
    width: 30,
    height: 30,
    tintColor: "#000000", // 아이콘 색상을 검은색으로 설정
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    // marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: "#555", // 약간 먹색
    lineHeight: 24,
  },
  horizontalLine: {
    borderBottomColor: "#bbb", // 선의 색상
    borderBottomWidth: 0.3, // 선의 두께
    marginVertical: 10, // 수평선 위아래 여백
    padding: 16,
  },
  memberCount: {
    fontSize: 13,
    marginBottom: 10,
    opacity: 0.5,
  },
});

export default PostTop;
