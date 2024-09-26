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
    <TouchableOpacity style={styles.inputField} onPress={showDatePicker}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "날짜를 선택하시오."}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
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
  value: {
    fontSize: 16,
    color: "#666666",
  },
});

export default DatePickerInputField;
