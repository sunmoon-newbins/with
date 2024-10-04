import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const LanguageButtons = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const LanguageButtons = [
    {
      source: require("../../../assets/korea.png"),
      onPress: () => changeLanguage("ko"),
    }, // 모든 컴포넌트가 한국어로
    {
      source: require("../../../assets/USA.png"),
      onPress: () => changeLanguage("en"),
    }, // 모든 컴포넌트가 미국어로
    { source: require("../../../assets/Spain.png"), onPress: () => {} }, // 모든 컴포넌트가 스페인어로
  ];

  return (
    <View style={styles.container}>
      {LanguageButtons.map((button, index) => (
        <TouchableOpacity key={index} onPress={button.onPress}>
          <Image
            resizeMode="contain"
            source={button.source}
            style={styles.LanguageButton}
            accessibilityLabel={`Language button ${index + 1}`}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row", //수평으로 나열
    justifyContent: "space-between",
    marginTop: 33,
  },
  LanguageButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "E8E8E8",
    borderRadius: 30,
    backgroundColor: "#ffffff",
    alignItems: "center",

    aspectRatio: 1,
  },
});

export default LanguageButtons;
