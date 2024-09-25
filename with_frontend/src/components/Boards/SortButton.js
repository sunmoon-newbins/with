import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Modal,
} from "react-native";

const SortButton = () => {
  const { width } = useWindowDimensions();
  const iconSize = width * 0.115; // 화면 너비의 11.5%를 아이콘 크기로 설정
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 가시성 상태 관리

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // 정렬 옵션을 선택했을 때 실행되는 함수
  const handleSortOptionPress = (option) => {
    console.log(`Selected Sort Option: ${option}`);
    // 여기서 각각의 정렬 로직을 추가하면 됩니다.

    //  만약 옵션이 "좋아요 많은순" 이라면~~~~ 등

    toggleModal(); // 옵션 선택 후 모달 닫기
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} activeOpacity={0.8}>
        <Image
          source={require("../../../assets/sortIcon.png")}
          style={{ width: iconSize, height: iconSize }} // 원하는 크기로 설정
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* 정렬 옵션 모달 */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              {/* 각 정렬 옵션 버튼 */}
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => handleSortOptionPress("좋아요 많은순")}
              >
                <Text>좋아요 많은순</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => handleSortOptionPress("좋아요 적은순")}
              >
                <Text>좋아요 적은순</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => handleSortOptionPress("달란트 많은순")}
              >
                <Text>달란트 많은순</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortOption}
                onPress={() => handleSortOptionPress("최신순")}
              >
                <Text>최신순</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 어둡게 처리
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    // 원하는 스타일 추가
  },
  sortOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
});

export default SortButton;
