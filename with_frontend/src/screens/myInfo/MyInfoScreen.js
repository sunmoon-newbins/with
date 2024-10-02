import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import useStore from "../../components/user/useStore";
const MyInfoScreen = () => {

  const { logout } = useStore();

  const navigation = useNavigation();
  return (
    <View>
      <Text>MyInfoScreen</Text>

      <Button
        title="Go to My Review"
        onPress={() => navigation.navigate("MyReview")}
      />

      <Button
        title="go to my notification"
        onPress={() => navigation.navigate("MyNotification")}
      />


      <Button
        title="logout"
        onPress={() => {
          logout();
        }}
      />

    </View>
  );
};

export default MyInfoScreen;
