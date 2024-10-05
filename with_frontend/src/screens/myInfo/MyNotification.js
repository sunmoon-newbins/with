import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import useStore from "../../components/user/useStore"; // 로그인한 사람 이름 .
import { Rating } from "react-native-ratings"; // 별점 라이브러리 추가
import LongButton from "../../components/common/LongButton"; // 커스텀 버튼

// 알림 데이터
const notifications = [
  {
    alrimId: 1,
    routeid: 1,
    userId: 1,
    type: 1, // 만족도 평가 알림
    postTitle: "부산여행 같이가요", // 게시글 제목
    authorTalent: 4.4, // 작성자 평점
    readAt: false,
  },
  {
    alrimId: 2,
    routeId: 2, // 게시글 아이디
    userid: 1, // 받는 사람
    type: 2, // 내가 받은 후기 알림
    authorName: "이사벨라", // 후기를 보낸 사람
    RecipientName: "소피아", // 로그인한 사용자 이름
    readAt: false,
  },
  // 추가 알림 데이터...
];

const MyNotification = ({ navigation }) => {
  const userId = useStore((state) => state.userId);
  const userName = useStore((state) => state.name);

  console.log("{MyNotification} const :", userId, userName);
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 관리
  const [selectedNotification, setSelectedNotification] = useState(null); // 선택된 알림
  const [rating, setRating] = useState(0); // 별점 상태 관리

  // 알림 클릭 핸들러
  // 1이면 모달열고 2이면 페이지만 이동
  const handleNotificationPress = async (notification) => {
    setSelectedNotification(notification);

    if (notification.type === 2) {
      await handleUpdateNotification(notification.id); // readAt true로 업데이트
      navigation.navigate("MyReview"); // 자신의 후기 페이지로 이동
    } else {
      setModalVisible(true);
    }
  };

  // 알림 업데이트 함수
  // const handleUpdateNotification = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `https://your-api-url.com/notifications/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ readAt: true }),
  //       }
  //     );
  //     if (response.ok) {
  //       console.log(`Notification with ID ${id} updated successfully.`);
  //     } else {
  //       console.log("Failed to update notification.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating notification:", error);
  //   }
  // };

  // 모달 확인 버튼 핸들러
  const handleModalConfirm = async () => {
    if (selectedNotification) {
      await handleUpdateNotification(selectedNotification.id);
    }
    setModalVisible(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#ffffff", padding: 12 }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {notifications.map((notification) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={notification.id}
          onPress={() => handleNotificationPress(notification)}
        >
          <View style={styles.notificationBox}>
            {notification.type === 1 ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "700", fontSize: 16 }}>
                    {`${notification.postTitle} 만족도 평가`}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={require("../../../assets/XButton.png")}
                      style={styles.xButton}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.mentBox}>
                  <Text>
                    {`${notification.authorName}님과 함께한 여행은 즐거우셨나요?`}
                  </Text>
                  <Text>
                    {`${notification.authorName}님께서 준비한 여행일정에 대해서 평가해주세요`}
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "700", fontSize: 16 }}>
                    {notification.authorName}님께서 후기를 보냈습니다.
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={require("../../../assets/XButton.png")}
                      style={styles.xButton}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.mentBox}>
                  <Text>{userName}님과 함께한 여행 후기를 확인해보세요!</Text>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* 모달 */}
      {selectedNotification && selectedNotification.type === 1 && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {/* 모달 외부를 누르면 닫히도록 */}
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      paddingBottom: 10,
                    }}
                  >
                    리뷰 등록하기
                  </Text>
                  <View style={styles.profileContainer}>
                    <Image
                      source={require("../../../assets/Sopia.png")}
                      style={styles.profileImage}
                    />
                    <View>
                      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                        {selectedNotification.authorName}
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {`평점 ${selectedNotification.authorTalent}`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.starContainer}>
                    <Rating
                      onFinishRating={(rating) => setRating(rating)}
                      style={{ paddingVertical: 10 }}
                      startingValue={1}
                      minValue={1}
                      ratingCount={5}
                      imageSize={40}
                    />
                  </View>
                  <TextInput
                    style={styles.reviewInput}
                    placeholder="평점과 후기를 남겨주세요"
                    multiline
                  />
                  <LongButton title="확인" onPress={handleModalConfirm} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  notificationBox: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F4F8FB",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mentBox: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 5,
  },
  xButton: {
    width: 30,
    height: 30,
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  starContainer: {
    marginTop: -10,
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewInput: {
    width: "100%",
    height: 100,
    backgroundColor: "#F4F8FB",
    padding: 10,
    borderRadius: 10,
    textAlignVertical: "top",
  },
});

export default MyNotification;
