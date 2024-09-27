import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import SignUpForm from "../../components/LoginScreen/SignUpForm";
import LanguageButtons from "../../components/LoginScreen/LanguageButtons";

const { width, height } = Dimensions.get("window");

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      {/* 회원가입 고정 헤더 */}
      <View style={styles.headerContainer}>
        <ImageBackground
          resizeMode="contain"
          source={require("../../../assets/back.png")}
          style={styles.headerImage}
        >
          <Text style={styles.headerText}>회원가입</Text>
        </ImageBackground>
      </View>

      {/* 고정된 borderRadius 영역 */}
      <View style={styles.fixedHeaderBackground} />

      {/* 스크롤 가능한 컨텐츠 */}
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.contentContainer}>
          <SignUpForm />
          <LanguageButtons />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5775CD",
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: height * 0.05, // 화면 높이의 5% 패딩
    paddingBottom: height * 0.02, // 화면 높이의 2% 패딩
    backgroundColor: "#5775CD", // 헤더 고정 배경색
  },
  headerImage: {
    aspectRatio: 1.91, // 너비가 높이의 1.91배가 됨
    width: "100%",
    maxWidth: width * 0.8, // 화면 너비의 80%를 사용
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    // fontFamily: "Inter, sans-serif",
    letterSpacing: 0.34,
  },
  // 새로운 고정된 배경 스타일
  fixedHeaderBackground: {
    position: "absolute",
    top: height * 0.315, // 화면 높이에 따라 동적으로 위치 조정
    left: 0,
    right: 0,
    height: height * 0.03, // 화면 높이에 따라 높이 조정
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1, // ScrollView 위에 렌더링되도록 설정
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingTop: height * 0.03, // 화면 높이에 따라 패딩 조정
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    padding: width * 0.05, // 화면 너비의 5% 패딩
    marginTop: -(height * 0.03), // 고정된 부분과 자연스럽게 연결되도록 조정
    zIndex: 0,
  },
});

export default SignUpScreen;
