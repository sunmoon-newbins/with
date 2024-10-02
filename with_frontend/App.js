import React, { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const App = () => {
  const [imageUri, setImageUri] = useState(null);

  // 이미지 선택 함수
  const pickImage = () => {
    const options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("사용자가 이미지 선택을 취소했습니다.");
      } else if (response.errorCode) {
        console.log("에러 발생: ", response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri); // 선택된 이미지의 URI를 상태로 저장
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="이미지 선택" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default App;
