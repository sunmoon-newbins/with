import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import SortButton from "../../components/Boards/SortButton";
import PostList from "../../components/Boards/PostList";
import Toast from "react-native-toast-message";
import axios from "axios";
import IPConfig from "../../configs/IPConfig.json";

const MyRouteBoardScreen = ({ route }) => {
  const screenUser = route.params?.user || {};
  console.log("!!!!!!!  user : ", screenUser.id);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { searchQuery, message } = route.params || {};
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: IPConfig.IP + `/users/${screenUser.id}/routes`,
          headers: { "Content-Type": "application/json" },
        });

        if (response.data) {
          console.log(
            "{HomeScreen} / useEffect / fetchData ",
            response.data.length
          );
          setPostList(response.data);
        }
      } catch (error) {
        console.log("데이터 가져오기 실패3", error);
      }
    };

    fetchData();
  }, [screenUser.id]);

  useEffect(() => {
    if (message) {
      Toast.show({
        type: "success",
        text1: message,
        position: "bottom",
        visibilityTime: 4000,
      });
    }
  }, [message]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
          <Image source={require("../../../assets/BackIcon.png")} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>게시한 루트</Text>
      </View>

      <View style={styles.OneRow}>
        <SortButton />
      </View>

      <PostList searchQuery={searchQuery} data={postList} />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: "95%",
          right: 10,
          zIndex: 1000,
          backgroundColor: "#fff",
          borderRadius: 30,
        }}
        onPress={() => navigation.navigate("recommendScreen")}
      >
        <Image
          source={require("../../../assets/angel.png")}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 18,
  },
  OneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerLeft: {
    width: 50,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default MyRouteBoardScreen;
