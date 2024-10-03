import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import * as Progress from "react-native-progress"; // progress bar 라이브러리
import * as ImagePicker from "expo-image-picker"; // expo-image-picker 라이브러리
import LanguageButtons from "../../components/LoginScreen/LanguageButtons";
import useStore from "../../components/user/useStore";

// userId: user.userId,
//           name: user.name,
//           Birth: user.birth,
//           Profile: user.profile,
//           Country: user.country,
//           Nickname: user.nickname,
//           Language: user.language,

const { width: screenWidth } = Dimensions.get("window"); // 화면 너비 가져오기

const MyInfoScreen = ({ navigation }) => {
  const [starRating, setStarRating] = useState(); // db에서 이사람 별점만 ,, 갖고옴.
  const name = useStore((state) => state.name);
  const nickname = useStore((state) => state.nickname);
  const birth = useStore((state) => state.birth);

  // 현재 연도에서 나이를 빼서 태어난 연도 계산
  const birthYear = new Date().getFullYear() - birth;
  // 😀 useStore를 통해 logout 함수를 가져옴
  const logout = useStore((state) => state.logout); // 로그아웃
  const Profile = useStore((state) => state.Profile); // 이미지 설명 ??
  const country = useStore((state) => state.country);

  const language = useStore((state) => state.language);

  console.log(
    "{MyInfoScreen} zustand user : ",
    name,
    nickname,
    birth,
    Profile,
    country,
    language
  );

  // 별점만 백엔드에서 userId 주고 갖고옴, , ,

  // 생년월일을 기준으로 나이를 계산하는 함수
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday); // 생년월일을 Date 객체로 변환
    const today = new Date(); // 오늘 날짜

    let age = today.getFullYear() - birthDate.getFullYear(); // 연도 차이 계산
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // 생일이 지나지 않았다면 나이를 1살 줄임
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const age = calculateAge(birth);

  const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 저장 상태

  const [modalVisible, setModalVisible] = useState(false);
  const users = [
    {
      id: 1,
      name: "침착맨",
      age: 25,
      country: "스페인",
      rating: 2.5, // 별점
    },
  ];

  // 이미지 선택 함수
  const pickImage = async () => {
    // 카메라 롤 사용 권한 요청
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("카메라 롤 사용 권한이 필요합니다.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 선택한 이미지의 URI를 상태에 저장
    } else {
      console.log("Image picker cancelled");
    }
  };

  // 로그아웃 모달 열기 함수
  const handleLogout = () => {
    setModalVisible(true); // 모달창 가시성 true로 설정
  };

  // 로그아웃 확인 함수
  const confirmLogout = async () => {
    setModalVisible(false);
    await logout();
    // 여기서 로그아웃 처리 로직 추가
    console.log("로그아웃 처리됨");

    // 잘되는구만
  };

  // 별점 비율로 변환 (최대 별점 5점이므로 0~1 사이의 값으로 변환)
  const ratingPercentage = users[0].rating / 5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>내 정보</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.title}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            {/* 😀 이미지가 없을 때 기본 동그란 이미지 보여주기 */}
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require("../../../assets/defaultProfile.png")}
                style={styles.profileImage}
              />
            )}
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.userTitle}>{name}</Text>
            {/* 참여자 이름 */}
            <Text style={styles.userName}>{nickname}</Text>
            {/* 닉네임인데, 자기소개로  */}
            <Text style={styles.userDetails}>만 {age}세</Text>
            <Text style={styles.userDetails}>{users[0].country}</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          {/* 별점과 Progress Bar를 겹쳐서 표시 */}
          <View style={styles.progressWrapper}>
            <Progress.Bar
              progress={ratingPercentage} // 별점 비율 적용
              width={screenWidth * 0.9} // 화면 너비의 80%를 Progress Bar의 너비로 설정
              height={50} // 바의 높이
              color={"#5775CD"} // 바의 색상
              unfilledColor={"#F4F8FB"} // 채워지지 않은 부분 색상
              borderWidth={1}
              borderColor={"#CCC"}
              borderRadius={10}
            />
            {/* Progress Bar 위에 별과 숫자를 겹쳐서 표시 */}
            <View style={styles.ratingOverlay}>
              <Text style={styles.ratingText}>⭐ {users[0].rating}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyRouteBoardScreen")}
        >
          <Image
            source={require("../../../assets/routeIcon.png")} // 경로를 실제 이미지 파일 경로로 변경
            style={styles.icon} // 스타일 적용
          />
          <Text style={styles.menuText}>게시한 루트</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyReview")}
        >
          <Image
            source={require("../../../assets/happyIcon.png")} // 경로를 실제 이미지 파일 경로로 변경
            style={styles.icon} // 스타일 적용
          />
          <Text style={styles.menuText}>받은 후기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyNotification")}
        >
          <Image
            source={require("../../../assets/alramIcon.png")} // 여기에 alarm.png 경로를 입력
            style={styles.icon} // 스타일 적용
          />
          <Text style={styles.menuText}>알림</Text>
        </TouchableOpacity>
        <LanguageButtons />

        {/* 로그아웃 모달 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>정말 로그아웃 하시겠습니까?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmLogout}
                >
                  <Text style={styles.modalButtonText}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    // fontWeight: "bold",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100, // 😀 동그란 프로필 이미지
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
    backgroundColor: "#F4F8FB",
    padding: 15,
    borderRadius: 10,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "semi-bold",
  },
  userDetails: {
    fontSize: 14,
    color: "#666",
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressWrapper: {
    position: "relative", // 자식 요소 겹치기 설정
    width: screenWidth * 0.9, // Progress Bar와 같은 너비
    height: 40, // Progress Bar와 같은 높이
    marginBottom: 10,
  },
  ratingOverlay: {
    position: "absolute", // Progress Bar 위에 겹침
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // 검정색 텍스트로 변경
  },
  menuItem: {
    backgroundColor: "#F4F8FB",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start", // 이미지와 텍스트를 가로로 배치
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 10, // 이미지와 텍스트 간격 조정
  },
  icon: {
    width: 24,
    height: 24, // 아이콘의 크기를 설정
  },
  selectedImage: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
  // 모달 스타일
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyInfoScreen;
