import React from "react";
import { View, StyleSheet, Image } from "react-native";
import LongButton from "../components/LongButton";
import useStore from "../components/user/store"; // zustand 스토어 가져오기

function StartScreen({ navigation }) {
  const { isLoggedIn } = useStore();

  return (
    <View style={styles.container}>
      {/* 이미지를 감싸는 둥근 컨테이너 */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/wydSeoul2027_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 버튼을 하단으로 배치 */}
      <View style={styles.buttonContainer}>
        <LongButton
          title="Let's get started"
          onPress={() => navigation.navigate("LoginScreen")} // 이동할 홈스크린 ㄴㄴ login Screen.
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // 밝은 배경색 유지
    alignItems: "center",
    justifyContent: "center", // 이미지와 버튼이 화면에 중앙 정렬
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125, // width와 height의 절반으로 설정하여 원형 유지
    backgroundColor: "#fff", // 흰색 배경
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)", // 그림자 색상 (어두운 색)
    shadowOffset: { width: 0, height: 10 }, // 그림자의 위치 조정
    shadowOpacity: 0.5, // 그림자 투명도 (진하게)
    shadowRadius: 20, // 그림자 반경 (부드럽고 넓게)
    elevation: 15, // Android에서 그림자 높이
    marginBottom: 30, // 버튼과 이미지 사이의 여백
  },
  logo: {
    width: 180,
    height: 180,
  },
  buttonContainer: {
    position: "absolute", // 버튼을 절대 위치로 설정
    bottom: 50, // 버튼을 화면 하단에서 50px 위로 배치
    width: "100%", // 버튼 컨테이너가 화면 전체 너비를 차지하도록 설정
    alignItems: "center", // 버튼을 중앙 정렬
  },
});

export default StartScreen;
