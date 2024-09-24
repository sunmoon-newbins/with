import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 사용을 위한 훅

function SearchButton() {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  const handlePress = () => {
    navigation.navigate("BoardSearchScreen"); // 'SearchPage'는 이동하고자 하는 화면의 이름
  };

  return (
    <TouchableOpacity style={styles.searchContainer} onPress={handlePress}>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>관광명소, 식당, 숙소 검색</Text>
      </View>
      <Image
        resizeMode="contain"
        source={require("../../../assets/Search.png")}
        style={styles.searchIcon}
        accessibilityLabel="검색"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
    borderRadius: 8,
    backgroundColor: "rgba(244, 248, 251, 1)",
    borderWidth: 2,
    borderColor: "rgba(232, 232, 232, 1)",
    padding: 10, // 버튼에 여백 추가
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: "500",
  },
  searchIcon: {
    width: 24,
    aspectRatio: 1,
  },
});

export default SearchButton;
