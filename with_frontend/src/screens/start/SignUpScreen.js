import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";

import SignUpForm from "../../components/loginScreen/SignUpForm";
import LanguageButtons from "../../components/loginScreen/LanguageButtons";

const SignUpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          resizeMode="contain"
          source={require("../../../assets/back.png")}
          style={styles.headerImage}
        >
          <Text style={styles.headerText}>회원가입</Text>
        </ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <SignUpForm />
        <LanguageButtons />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#5775CD",
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 37,
    paddingBottom: 5,
  },
  headerImage: {
    aspectRatio: 1.91, // 너비가 높이의 1.91배가 됨
    width: "100%",
    maxWidth: 277,
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
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
});

export default SignUpScreen;
