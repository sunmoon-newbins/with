import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

function RecentChatMessage({ title, message, time, name, headCount, image }) {
  return (
    <View style={styles.container}>
      {/* 기차표 모양의 배경 */}
      <View style={styles.chatBoxContainer}>
        <Image
          source={require("../../../assets/NewChatBox.png")}
          style={styles.ticketBackground}
          //   resizeMode="contain" // 이미지가 잘리지 않도록 contain 모드 사용
          resizeMode="contain"
        />
        {/* 전체패딩줌 30 */}
        <View style={styles.contentContainer}>
          {/* 제목 텍스트 */}
          {/* 제목 패딩 15 */}
          <View
            style={{
              paddingBottom: 7,
              flexDirection: "row",
              justifyContent: "space-between",
              // borderWidth: 1,
              borderColor: "red",
            }}
          >
            <Text style={styles.title}>{title}</Text>

            <Text
              style={{
                opacity: 0.5,
                paddingTop: 2,
              }}
            >
              {headCount}
            </Text>
          </View>

          {/* 점선 */}

          {/* 프로필 이미지와 메시지
          메시지 뷰 패딩 두기 */}
          <View style={styles.messageRow}>
            <Image
              resizeMode="contain"
              source={{
                uri: image, // image 가 url 이기떄문에
              }}
              style={styles.userImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.username}>{name}</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // borderWidth: 1,
                  maxWidth: "100%",
                  overflow: "hidden", //
                  borderColor: "yellow",
                }}
              >
                <Text
                  style={[styles.messageText, { maxWidth: "70%" }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {message}
                </Text>
                <Text style={styles.time}>{time}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  chatBoxContainer: {
    width: "100%", // 부모 컨테이너의 너비에 맞추도록 설정

    height: 120,
    position: "relative",
    borderRadius: 10, // 모서리를 둥글게 처리
  },
  ticketBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    // left: "-2.5",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 30, // 컨텐츠의 안쪽 여백
    // borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5775CD",
    // marginBottom: 8,
  },
  dottedLine: {
    width: "100%",
    height: 2,
    marginVertical: 5,
  },
  messageRow: {
    // borderWidth: 1,
    borderColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 7,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    borderColor: "orange",
    // borderWidth: 1,
    maxHeight: " 70%",
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    // marginTop: 10,
    // paddingTop: 10,
    // marginBottom: 3,
  },
  messageText: {
    fontSize: 13,
    maxWidth: "70%",
    maxHeight: "100%",
  },
  time: {
    fontSize: 12,
    color: "#000000",
    opacity: 0.5,
    textAlign: "right",
  },
});

export default RecentChatMessage;

// import React from "react";
// import { View, StyleSheet, Image, Text, Dimensions, Platform } from "react-native";

// // 화면의 너비와 높이 가져오기
// const { width, height } = Dimensions.get("window");

// function RecentChatMessage({ title, message, time, name, headCount, image }) {
//   return (
//     <View style={styles.container}>
//       {/* 기차표 모양의 배경 */}
//       <View style={styles.chatBoxContainer}>
//         <Image
//           source={require("../../../assets/NewChatBox.png")}
//           style={styles.ticketBackground}
//           resizeMode="contain"
//         />
//         <View style={styles.contentContainer}>
//           {/* 제목 텍스트 */}
//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>{title}</Text>
//             <Text style={styles.headCount}>{headCount}</Text>
//           </View>

//           {/* 프로필 이미지와 메시지 */}
//           <View style={styles.messageRow}>
//             <Image
//               resizeMode="contain"
//               source={{ uri: image }}
//               style={styles.userImage}
//             />
//             <View style={styles.textContainer}>
//               <Text style={styles.username}>{name}</Text>
//               <View style={styles.messageTimeContainer}>
//                 <Text style={styles.messageText}>{message}</Text>
//                 <Text style={styles.time}>{time}</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: width * 0.03, // 화면 너비의 3%를 패딩으로 설정
//   },
//   chatBoxContainer: {
//     width: "100%", // 부모 컨테이너의 너비에 맞추도록 설정
//     height: height * 0.15, // 화면 높이의 15%를 높이로 설정
//     position: "relative",
//     borderRadius: 10, // 모서리를 둥글게 처리
//   },
//   ticketBackground: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     top: 0,
//     borderRadius: 10,
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: "center",
//     padding: width * 0.05, // 화면 너비의 5%를 패딩으로 설정
//   },
//   titleContainer: {
//     paddingBottom: height * 0.01, // 화면 높이의 1%를 패딩으로 설정
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   title: {
//     fontSize: width * 0.04, // 화면 너비의 4%를 폰트 크기로 설정
//     fontWeight: "bold",
//     color: "#5775CD",
//   },
//   headCount: {
//     opacity: 0.5,
//     paddingTop: height * 0.005, // 화면 높이의 0.5% 패딩
//   },
//   messageRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     paddingBottom: height * 0.01, // 화면 높이의 1%를 패딩으로 설정
//   },
//   userImage: {
//     width: width * 0.1, // 화면 너비의 10%를 이미지 크기로 설정
//     height: width * 0.1, // 동일한 비율로 이미지 높이 설정
//     borderRadius: 10,
//   },
//   textContainer: {
//     flex: 1,
//     marginLeft: width * 0.03, // 화면 너비의 3% 마진
//   },
//   username: {
//     fontWeight: "bold",
//     fontSize: width * 0.035, // 화면 너비의 3.5% 폰트 크기
//     marginBottom: height * 0.005, // 화면 높이의 0.5% 마진
//   },
//   messageTimeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     maxWidth: "100%",
//     overflow: "hidden",
//   },
//   messageText: {
//     fontSize: width * 0.033, // 화면 너비의 3.3% 폰트 크기
//     maxWidth: "70%",
//   },
//   time: {
//     fontSize: width * 0.03, // 화면 너비의 3% 폰트 크기
//     color: "#000000",
//     opacity: 0.5,
//     textAlign: "right",
//   },
// });

// export default RecentChatMessage;
