import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputTextField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  accessibilityLabel,
  labelStyle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9094B8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: "#0B1527",
    fontSize: 15,

    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#F4F8FB",
    borderRadius: 5,
    padding: 10,
    color: "#0B1527",

    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default InputTextField;
