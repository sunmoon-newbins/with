import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

const ChatDetailMenuScreen = ({ navigation }) => {
  // 예시 사용자 데이터

  const users = [
    // 해당 채팅방의 ID 에 맞는 사용자들을 불러와야함,,
    {
      id: 1,
      name: "빌게이츠",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "해리포터",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "일론머스크",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "탄지로",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const handleExitPress = () => {
    setModalVisible(true);
  };

  const handleConfirmExit = () => {
    setModalVisible(false);
    navigation.navigate("ChatListScreen");
    // 여기에 채팅방 삭제 구현
  };

  return (
    <View style={styles.container}>
      {/* 대화상대 박스 */}
      <View style={styles.headerBox}>
        <Image
          source={require("../../../assets/talkPeopleIcon.png")}
          style={styles.headerIcon}
          resizeMode="cover"
        />
        <Text style={styles.title}>대화상대</Text>
      </View>

      {/* 사용자 목록 */}
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={styles.userContainer}
          onPress={() =>
            navigation.navigate(
              "유저아이디 갖고서!! 내정보 네비게이션을 갖다 붙이기  ㅎㅎㅎ ",
              { userId: user.id }
            )
          } // 새로운 화면으로 navigate 유저 아이디갖고서는 ,,
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
        </TouchableOpacity>
      ))}

      {/* 수평선 */}
      <View style={styles.separator} />

      {/* 나가기 아이콘 버튼 */}
      <TouchableOpacity style={styles.exitIconButton} onPress={handleExitPress}>
        <View style={styles.exitIconContainer}>
          <Image
            source={require("../../../assets/exitIcon.png")} // 나가기 아이콘 경로에 맞게 수정
            style={styles.exitIcon}
          />
          <Text style={styles.exitIconText}>나가기</Text>
        </View>
      </TouchableOpacity>

      {/* 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>정말 나가겠습니까?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmExit}
              >
                <Text style={styles.modalButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // 컨테이너 스타일
  container: {
    // flex: 1,
    justifyContent: "space-between", // 나가기 버튼을 화면 하단에 배치
    paddingHorizontal: 20, // 수평 여백
    paddingVertical: 30, // 수직 여백
  },

  // 대화상대 박스 스타일
  headerBox: {
    flexDirection: "row", // 아이콘과 텍스트가 가로로 배치되도록 설정
    alignItems: "center", // 세로 중앙 정렬
    backgroundColor: "#5775CD", // 배경 색상
    padding: 10,
    borderRadius: 5,
    marginTop: 70,
    marginBottom: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  title: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  // 사용자 목록 스타일
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },

  // 수평선 스타일
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },

  // 나가기 버튼 스타일
  exitIconButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  exitIconContainer: {
    flexDirection: "row", // 아이콘과 텍스트를 가로로 배치
    alignItems: "center", // 세로 중앙 정렬
  },
  exitIcon: {
    width: 15,
    height: 25,
    tintColor: "#5775CD", // 아이콘 색상 설정
  },
  exitIconText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600", // 세미볼드 적용
    color: "rgba(117, 117, 117, 0.5)", // 투명도 50% 적용
  },

  // 모달 스타일
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  confirmButton: {
    backgroundColor: "#5775CD",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatDetailMenuScreen;
