import { View, Text } from "react-native";
import React from "react";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FriendsList">
      <Stack.Screen
        name="FriendsList"
        component={FriendsList}
        options={{ title: "친구 목록" }}
      />
      <Stack.Screen
        name="FriendsListDetail"
        component={FriendsListDetail}
        options={{ title: "친구 상세정보" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
