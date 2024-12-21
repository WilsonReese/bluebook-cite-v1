import { StyleSheet, TextInput, View } from "react-native";
import globalStyle from "../utils/styles";
import { useState } from "react";


export default function TextInputField({onTextChange, value, isEnabled}) {

  return (
    <View style={[s.inputContainer, !isEnabled && s.disabledInputContainer]}>
      <TextInput
        style={[s.textInput, globalStyle.text]}
        placeholder="To Kill a Mockingbird by Harper Lee"
        placeholderTextColor="#B8C3CC"
        value={value}
        onChangeText={onTextChange}
        editable={isEnabled}
      />
    </View>
  );
}

const s = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#B8C3CC",
    borderRadius: 8,
  },
  disabledInputContainer: {
    backgroundColor: "#DAE1E5", // Change background color for disabled state
    borderColor: '#B8C3CC'
  },
	textInput: {
    flex: 1,
  },
});
