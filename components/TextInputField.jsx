import { StyleSheet, TextInput, View } from "react-native";
import globalStyle from "../utils/styles";
import { useState } from "react";


export default function TextInputField({onTextChange}) {
  const [text, setText] = useState("");

  function handleTextChange(value) {
    setText(value);
    onTextChange(value); // Notify parent component
  }

  return (
    <View style={s.inputContainer}>
      <TextInput
        style={[s.textInput, globalStyle.text]}
        placeholder="To Kill a Mockingbird by Harper Lee"
        placeholderTextColor="#B8C3CC"
        value={text}
        onChangeText={handleTextChange}
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
	textInput: {
    flex: 1,
  },
});
