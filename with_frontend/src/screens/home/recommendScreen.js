import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Linking,
} from "react-native";

const apps = [
  {
    name: "배민",
    description: "다양한 음식점 제공과 배달 주문",
    image: require("../../../assets/baemin.png"), // 확장자를 정확하게 수정
    appStoreUrl: "https://apps.apple.com/kr/app/id378084485", // App Store URL
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.sampleapp&hl=ko", // Play Store URL
  },
  {
    name: "네이버 지도",
    description: "위치 정보와 대중교통 제공",
    image: require("../../../assets/navermap.png"),
    appStoreUrl: "https://apps.apple.com/kr/app/id311867728",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.nhn.android.nmap&hl=ko",
  },
  {
    name: "카카오 T",
    description: "대중 교통 호출 및 서비스 제공",
    image: require("../../../assets/kakaoT.png"),
    appStoreUrl: "https://apps.apple.com/kr/app/id981110422",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.sample.kakao.t",
  },
  {
    name: "공공와이파이",
    description: "무료 와이파이 위치 제공",
    image: require("../../../assets/wifiIcon.png"),
    appStoreUrl: "https://apps.apple.com/kr/app/id1501468070",
    playStoreUrl:
      "https://play.google.com/store/search?q=%EA%B3%B5%EA%B3%B5%EC%99%80%EC%9D%B4%ED%8C%8C%EC%9D%B4%EC%9D%B4&c=apps&hl=ko",
  },
  {
    name: "야놀자",
    description: "여행 패키지 예약 제공",
    image: require("../../../assets/yanolja.png"),
    appStoreUrl: "https://apps.apple.com/kr/app/id436731843",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.cultsotry.yanolja.nativeapp&hl=ko",
  },
  {
    name: "파파고",
    description: "다양한 방식으로 번역 제공",
    image: require("../../../assets/papago.png"),
    appStoreUrl: "https://apps.apple.com/kr/app/id1147874819",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.naver.labs.translator&hl=ko",
  },
];

const RecommendScreen = () => {
  const onSelect = (app) => {
    const url = Platform.OS === "ios" ? app.appStoreUrl : app.playStoreUrl;
    Linking.openURL(url).catch((err) =>
      console.error("스토어로 이동하는 중 오류가 발생했습니다.", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      {apps.map((app, index) => (
        <TouchableOpacity
          key={index}
          style={styles.appContainer}
          onPress={() => onSelect(app)}
        >
          <Image source={app.image} style={styles.appImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.appName}>{app.name}</Text>
            <Text style={styles.appDescription}>{app.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FB",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  appContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  appImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default RecommendScreen;
