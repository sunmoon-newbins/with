import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from "react-native";
import WelcomeMessage from "../../components/loginScreen/WelcomeMessage";
import LoginForm from "../../components/loginScreen/LoginForm";
import LanguageButtons from "../../components/loginScreen/LanguageButtons";
import Style from "../../configs/Style.json";

const LoginScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          resizeMode="contain"
          source={require("../../assets/back.png")}
          style={styles.headerImage}
        >
          <Text style={styles.headerText}>로그인</Text>
        </ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <WelcomeMessage />
        <LoginForm />
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
    fontFamily: "Inter, sans-serif",
    letterSpacing: 0.34,
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
});

export default LoginScreen;
