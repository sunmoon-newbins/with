import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePickerInputField = ({ label, value, onChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd 형식으로 변환
    onChange(formattedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {/* Label 스타일을 InputTextField와 동일하게 설정 */}
      <Text style={styles.label}>{label}</Text>
      {/* InputTextField와 동일한 스타일로 디자인 */}
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        {/* value가 있으면 날짜, 없으면 placeholder와 동일한 문구 표시 */}
        <Text
          style={[
            styles.value,
            value ? styles.valueText : styles.placeholderText,
          ]}
        >
          {value || "날짜를 선택하시오."}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
    // fontFamily: "Inter, sans-serif", // Inter 폰트 적용 시 주석 해제
    fontSize: 16,
    backgroundColor: "#F4F8FB",
    borderRadius: 5,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E8E8E8", // InputTextField의 input과 동일한 border 색상
    color: "#0B1527",
    justifyContent: "center", // 가운데 정렬
  },
  value: {
    fontSize: 16,
    color: "#9094B8", // placeholderTextColor와 동일하게 설정
  },
  valueText: {
    color: "#0B1527", // 실제 값이 있을 때 텍스트 색상
  },
  placeholderText: {
    color: "#9094B8", // placeholderTextColor와 동일한 색상 설정
  },
});

export default DatePickerInputField;
