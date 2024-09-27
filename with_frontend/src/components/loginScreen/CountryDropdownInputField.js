import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const CountryDropdownInputField = ({ label, value, onChange }) => {
  return (
    <View style={styles.container}>
      {/* InputTextField의 label과 동일한 스타일 */}
      <Text style={styles.label}>{label}</Text>
      {/* InputTextField의 input과 동일한 스타일 */}
      <View style={styles.input}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // InputTextField와 동일한 margin 설정
  },
  label: {
    color: "#0B1527",
    fontSize: 15,
    // fontFamily: "Inter, sans-serif", // Inter 폰트 적용 시 주석 해제
    marginBottom: 12, // InputTextField의 label과 동일한 간격 설정
  },
  input: {
    backgroundColor: "#F4F8FB",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8", // InputTextField의 input과 동일한 border 색상
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "#0B1527", // 선택된 텍스트 색상을 InputTextField의 input과 동일하게 설정
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F4F8FB",
  },
  inputAndroid: {
    fontSize: 16,
    color: "#0B1527", // 선택된 텍스트 색상을 InputTextField의 input과 동일하게 설정
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: "#F4F8FB",
  },
  placeholder: {
    color: "#9094B8", // placeholderTextColor와 동일한 색상 설정
  },
});

export default CountryDropdownInputField;
