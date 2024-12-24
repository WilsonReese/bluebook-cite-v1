import { Platform, StyleSheet, TextInput, View } from "react-native";
import globalStyle from "../utils/styles";
import { useState } from "react";


export default function TextInputField({onTextChange, value, isEnabled, onSubmit}) {
  const isWeb = Platform.OS === "web"; // Check if the platform is web

  return (
    <View style={[s.inputContainer, !isEnabled && s.disabledInputContainer]}>
      <TextInput
        style={[s.textInput, globalStyle.text]}
        placeholder="To Kill a Mockingbird by Harper Lee"
        placeholderTextColor="#B8C3CC"
        value={value}
        onChangeText={onTextChange}
        editable={isEnabled} // Control editability
        keyboardType={isWeb ? "default" : "ascii-capable"} // Ensure keyboard compatibility for web
        accessibilityRole={isWeb ? "textbox" : undefined} // Explicit role for web
        pointerEvents={isEnabled ? "auto" : "none"} // Disable interaction when not enabled
        onSubmitEditing={onSubmit} // Trigger the function when "Enter"/"Return" is pressed
        returnKeyType='done' // Show "Done" button on mobile keyboards
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
    alignSelf: 'stretch'
  },
  disabledInputContainer: {
    backgroundColor: "#DAE1E5", // Change background color for disabled state
    borderColor: '#B8C3CC'
  },
	textInput: {
    flex: 1,
    outlineStyle: "none",
  },
});