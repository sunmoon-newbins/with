// AngelSelectMenuScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import {
  conversation1,
  conversation2,
  conversation3,
  conversation4,
  conversation5,
  conversation6,
} from "../../components/common/dummyMessage";

const AngelSelectMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>안젤라와 나눈 대화</Text>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // 주제 1 데이터 전달
          navigation.navigate("안젤라 상담소", {
            selectedMessages: conversation1,
          });
        }}
      >
        <Text style={styles.menuText}>
          얼굴작다고 하는데 이거 놀리는 건가요?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // 주제 2 데이터 전달
          navigation.navigate("안젤라 상담소", {
            selectedMessages: conversation2,
          });
        }}
      >
        <Text style={styles.menuText}>
          북한산 가는 택시에서 지갑을 놓고 내렸어요
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // 주제 2 데이터 전달
          navigation.navigate("안젤라 상담소", {
            selectedMessages: conversation3,
          });
        }}
      >
        <Text style={styles.menuText}>실내에서 할만한 활동 추천</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // 주제 2 데이터 전달
          navigation.navigate("안젤라 상담소", {
            selectedMessages: conversation4,
          });
        }}
      >
        <Text style={styles.menuText}>야경을 즐길 수 있는 좋은 장소</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // 주제 2 데이터 전달
          navigation.navigate("안젤라 상담소", {
            selectedMessages: conversation5,
          });
        }}
      >
        <Text style={styles.menuText}>해운대 외에 다른 추천해주실 해변</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          // 주제 2 데이터 전달
          navigation.navigate("안젤라 상담소", {
            selectedMessages: conversation6,
          });
        }}
      >
        <Text style={styles.menuText}>화장실이 너무 급해요</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 18,
  },
});

export default AngelSelectMenuScreen;
