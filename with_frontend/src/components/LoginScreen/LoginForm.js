// screens/LoginScreen.js
import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import useStore from "../user/useStore"; // zustand 스토어 가져오기
import InputTextField from "../common/InputTextField"; // InputTextField 컴포넌트 경로를 적절히 설정하세요.
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  // console.log("왜네비게이션이 ", navigation); // navigation이 undefined인지 확인
  // zustand 스토어에서 상태와 업데이트 함수를 가져옴
  const {
    id,
    password,
    rememberMe,
    setId,
    setPassword,
    toggleRememberMe,
    login,
  } = useStore(); // 로그인할 때 이거 다 저장하면 , 아이디, 비밀번호를 zustand 에서 계속 쓸 수 있음.
  // 그러니 여기서만 setId setPassword 할것.

  const handleLogin = () => {
    if (id && password) {
      // 로그인 로직 (여기서는 간단하게 처리)
      // if 아이디 비번이 있다면 백엔드에 있다면~~
      // 근데 보안이 정말 취약할것 같긴한데용,,

      login(); // 상태를 로그인 상태로 변경
      // navigation.replace("Home"); // 로그인 후 홈 화면으로 이동 자동으로 바뀜 app.js 에서 .
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };
  // console.log("id", id);
  // console.log("passw", password);
  // const handleSignUp = () => {

  //   alert("회원가입 기능은 아직 구현되지 않았습니다.");
  //   navigation.
  // };

  return (
    <View style={styles.container}>
      <InputTextField
        label="아이디"
        placeholder="아이디를 입력하시오."
        value={id}
        onChangeText={setId}
        accessibilityLabel="아이디 입력"
      />
      <InputTextField
        label="비밀번호"
        placeholder="비밀번호를 입력하시오."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="비밀번호 입력"
      />

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={toggleRememberMe} // 항상로그인이 선택됨.
          accessibilityRole="checkbox"
          accessibilityState={{ checked: rememberMe }}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkedBox]} />
          <Text style={styles.rememberMeText}>항상 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          // onPress={
          //   () => navigation.navigate("SignUpScreen") // PostDetailScreen으로 네비게이트
          // }
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF", // 필요에 따라 배경색 변경
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 33,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: "#5775CD",
    borderColor: "#5775CD",
  },
  rememberMeText: {
    color: "#666",
    fontSize: 14,
    // fontFamily: "Inter, sans-serif",
  },
  signUpButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5079CB",
    padding: 6,
    paddingHorizontal: 17,
  },
  signUpText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    // fontFamily: "Inter, sans-serif",
    letterSpacing: 0.34,
  },
  loginButton: {
    backgroundColor: "#5775CD",
    borderRadius: 5,
    padding: 14,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    // fontFamily: "Inter, sans-serif",
    letterSpacing: 0.34,
  },
});

export default LoginScreen;
