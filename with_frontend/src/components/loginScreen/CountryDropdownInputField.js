import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const CountryDropdownInputField = ({ label, value, onChange }) => {
  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={onChange}
        items={[
          { label: "대한민국", value: "KOR" },
          { label: "미국", value: "USA" },
          { label: "스페인", value: "ESP" },
        ]}
        placeholder={{
          label: "국적을 선택하시오.",
          value: null,
        }}
        value={value}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false} // 스타일 커스터마이징을 위한 설정
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "#666666",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    color: "#666666",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default CountryDropdownInputField;
