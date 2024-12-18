import { StyleSheet, TextInput, View } from "react-native";
import style from "../utils/styles";


export default function TextInputField() {
  return (
    <View style={s.inputContainer}>
      <TextInput
        style={[s.textInput, style.text]}
        placeholder="To Kill a Mockingbird by Harper Lee"
        placeholderTextColor="#B8C3CC"
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
