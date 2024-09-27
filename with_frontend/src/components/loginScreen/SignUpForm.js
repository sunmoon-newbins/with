import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useStore from "../user/useStore"; // zustand 스토어 가져오기

import InputTextField from "../common/InputTextField"; // InputTextField 컴포넌트 경로를 적절히 설정하세요.
import DatePickerInputField from "../loginScreen/DatePickerInputField"; // 새로 만든 DatePickerInputField 컴포넌트
import CountryDropdownInputField from "../loginScreen/CountryDropdownInputField"; // 새로 만든 CountryDropdownInputField 컴포넌트

const SignUpForm = () => {
  const navigation = useNavigation();

  //   {
  //     "id" : "example_id",
  //     "password" : "example_password",
  //     "name" : "홍길동",
  //     "nickname" : "길동이",
  //     "birth" : "1990-01-01",
  //     "profile" : "profile description",
  //     "country" : "KOR",
  //     "language" : "KOR"
  // }

  // useState 훅으로 로컬 상태 선언
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [profile, setProfile] = useState(""); // 처음 프로필은 안만듦.
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");

  const handleSignUp = () => {
    //    백엔드에 지금 변수들 넘기는 코드
  };

  return (
    <View style={styles.container}>
      <InputTextField
        label="아이디"
        placeholder="아이디를 입력하시오."
        value={id}
        onChangeText={setId}
      />
      <InputTextField
        label="비밀번호"
        placeholder="비밀번호를 입력하시오."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputTextField
        label="비밀번호 확인"
        placeholder="비밀번호 확인를 입력하시오."
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry // ** 로 보이게하는거
      />
      <InputTextField
        label="이름"
        placeholder="이름을 입력하시오."
        value={name}
        onChangeText={setName}
      />
      <InputTextField
        label="닉네임"
        placeholder="닉네임을 입력하시오."
        value={nickname}
        onChangeText={setNickname}
      />
      {/* DatePicker를 사용한 생년월일 필드 */}
      <DatePickerInputField
        label="생년월일"
        value={birth}
        onChange={setBirth}
      />
      {/* Dropdown을 사용한 국적 선택 필드 */}
      <CountryDropdownInputField
        label="국적"
        value={country}
        onChange={setCountry}
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.signUpText}>로그인</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>회원가입</Text>
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
    justifyContent: "flex-end",
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

export default SignUpForm;
