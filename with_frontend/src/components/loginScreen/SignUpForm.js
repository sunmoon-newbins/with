import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import useStore from "../user/useStore"; // zustand 스토어 가져오기
import IPconfig from "../../configs/IPConfig.json";
import InputTextField from "../common/InputTextField"; // InputTextField 컴포넌트 경로를 적절히 설정하세요.
import DatePickerInputField from "./DatePickerInputField"; // 새로 만든 DatePickerInputField 컴포넌트
import CountryDropdownInputField from "./CountryDropdownInputField"; // 새로 만든 CountryDropdownInputField 컴포넌트
import LanguageButtons from "./LanguageButtons";
const SignUpForm = () => {
  const navigation = useNavigation();

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

  const idRegex = /^[a-zA-Z0-9]{1,16}$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{12,}$/;
  const nameRegex = /^[ㄱ-힣a-zA-Z]*$/;
  const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

  const handleSignUp = async () => {
    const url = IPconfig.IP + `/users/signup`;
    console.log(url);

    const signUpData = {
      id: id,
      password: password,
      name: name,
      nickname: nickname,
      birth: birth,
      profile: profile,
      country: country,
      language: "KOR",
    };

    try {
      console.log(
        "{SignUpForm} handleSignup / signUpData = ",
        JSON.stringify(signUpData)
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      console.log("서버 응답 받음");

      console.log("서버 응답 상태 코드:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("회원가입 성공:", data);

        // 회원가입 성공 시 Alert 창 띄우기
        Alert.alert(
          "회원가입 성공",
          "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.",
          [
            {
              text: "확인",
              onPress: () => navigation.navigate("LoginScreen"), // 확인 버튼을 눌렀을 때 로그인 페이지로 이동
            },
          ]
        );
      } else {
        const errorData = await response.json();
        console.error("회원가입 실패:", errorData);
        Alert.alert(
          "회원가입 실패",
          "회원가입에 실패했습니다. 다시 시도해주세요."
        );
      }
    } catch (error) {
      console.error("네트워크 오류!:", error);

      Alert.alert(
        "네트워크 오류",
        "네트워크 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
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
      <LanguageButtons />
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
