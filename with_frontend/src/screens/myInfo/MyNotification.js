
// 일단 use State 로 관리해야함.

// 리뷰 보낼 떄

// 회원id  (보내는 사람 이름 갖고오려고)
// 받는 사람 Id  (  받는사람 ID 에서 회원 이름 갖고오려고)
// 루트번호 ID  ( 루트제목 갖고오려고 )
// 달런트,
// 내용,
// 작성시간 (현재시간)
// 을 보내줘야함

// 모달  만족도 평가만 별점 누를 수 있게하고

// 별점 리뷰 등록하기 모달 디자인 고치기

// x 버튼 누르면 백엔드에 삭제 처리 보내기

// 터쳐블 오파시티 터치하면 색채도 달라지는거 어떻게 못바꾸나 보기 .

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,

  Button,

  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import useStore from "../../components/user/useStore"; // 로그인한 사람 이름 .

import { Rating } from "react-native-ratings";
import LongButton from "../../components/common/LongButton";

// 알림 데이터

// 알림번호
// 루트번호
// 알림타입
// 루트 제목
// 루트 작성자 이름
// 루트 작성자 평점
// 읽었는지 false 로

const notifications = [
  {
    ROUTE_NUM: 1, // 루트번호
    TYPE: 1, // 만족도 평가 알림
    postTitle: "부산여행 같이가요", // 게시글 제목
    authorName: "이사벨라", // 작성자 이름
    authorTalent: 4.4, // 작성자 달란트 (포인트)
    readAt: false,
  },
  {
    id: 2, // 후기번호
    type: 2, // 내가 받은 후기 알림
    authorName: "이사벨라", // 후기를 보낸 사람
    RecipientName: "소피아", // 로그인한 사용자 이름
    readAt: false,
  },
];

const MyNotification = ({ navigation }) => {

// import StarRating from "react-native-star-rating"; // 별점 라이브러리 추가
import { Rating } from "react-native-ratings";
// 알림 데이터
const notifications = [
  {
    id: 1,
    type: 1, // 만족도 평가 알림
    postTitle: "부산여행 같이가요", // 게시글 제목
    authorName: "이사벨라", // 작성자 이름
    authorTalent: 4.4, // 작성자 달란트 (포인트)
  },
  {
    id: 2,
    type: 2, // 내가 받은 후기 알림
    authorName: "이사벨라", // 후기를 보낸 사람
    RecipientName: "소피아", // 로그인한 사용자 이름
  },
  {
    id: 3,
    type: 1, // 만족도 평가 알림
    postTitle: "서울관광명소 뺑뺑이 여행", // 게시글 제목
    authorName: "존", // 작성자 이름
    authorTalent: 3.5, // 작성자 달란트
  },
  {
    id: 4,
    type: 2, // 내가 받은 후기 알림
    authorName: "존", // 후기를 보낸 사람
    RecipientName: "리사", // 로그인한 사용자 이름
  },
];

const MyNotification = () => {

  const userName = useStore((state) => state.name);
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 관리
  const [selectedNotification, setSelectedNotification] = useState(null); // 선택된 알림
  const [rating, setRating] = useState(0); // 별점 상태 관리


  const handleNotificationPress = async (notification) => {
    setSelectedNotification(notification);

    if (notification.type === 2) {
      await handleUpdateNotification(notification.id); // readAt true로 업데이트
      navigation.navigate("MyReview"); // 자신의 후기 페이지로 이동
    } else {
      setModalVisible(true); // 모달 열기
    }
  };

  const handleUpdateNotification = async (id) => {
    try {
      // PATCH 요청으로 readAt true로 업데이트
      const response = await fetch(
        `https://your-api-url.com/notifications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ readAt: true }),
        }
      );

      if (response.ok) {
        console.log(`Notification with ID ${id} updated successfully.`);
      } else {
        console.log("Failed to update notification.");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const handleModalConfirm = async () => {
    if (selectedNotification) {
      await handleUpdateNotification(selectedNotification.id);
    }
    setModalVisible(false);

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true); // 모달 열기

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
                  <Text
                    style={{ fontWeight: 700, fontSize: 16 }}
                  >{`${notification.postTitle} 만족도 평가`}</Text>
                  <TouchableOpacity>
                    <Image
                      source={require("../../../assets/XButton.png")}
                      style={styles.xButton}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.mentBox}>
                  <Text>{`${notification.authorName}님과 함께한 여행은 즐거우셨나요?`}</Text>
                  <Text>{`${notification.authorName}님께서 준비한 여행일정에 대해서 평가해주세요`}</Text>
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
                  <Text style={{ fontWeight: 700, fontSize: 16 }}>
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
                  <Text>
                    {userName}님과 함께한 여행 후기를 보냈습니다.
                    {notification.authorName}님께서 준비한 여행일정에 대한
                    후기를 확인해보세요~!
                  </Text>
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

          {/* ⭐여기서 모달 외부를 누르면 닫히도록 설정한 부분⭐ */}

          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>

                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      marginBottom: 10,
                    }}
                  >
                    리뷰

                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
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
                      <Text
                        style={{ fontWeight: "bold" }}
                      >{`평점 ${selectedNotification.authorTalent}`}</Text>
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
