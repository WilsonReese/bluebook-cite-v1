import { Pressable, StyleSheet, Text, View } from "react-native";
import globalStyle from "../utils/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function GenerateButton({
  btnText,
  isEnabled,
  style,
  onPress,
}) {

  function checkIfEnabled() {
    return isEnabled ? s.enabled : s.disabled;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        s.btn,
        checkIfEnabled(),
        isEnabled && pressed && { opacity: 0.5 },
        style,
      ]}
      onPress={isEnabled ? onPress : null}
    >
      <View>
				<Text style={[globalStyle.text, s.btnText]}>{btnText}</Text>
			</View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    // flex: 1,
    paddingHorizontal: 8,
		alignSelf: 'stretch',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: 60,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: "#B8C3CC",
  },
  enabled: {
    backgroundColor: "#184EAD",
    borderColor: "#184EAD",
    //shadow
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  btnText: {
    fontFamily: 'Figtree_600SemiBold',
		fontSize: 16,
		color: '#F8F8F8'
  },
});
