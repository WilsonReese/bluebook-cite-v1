import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import globalStyle from "../utils/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function GenerateButton({
  btnText,
  isEnabled,
  isLoading,
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
      onPress={isEnabled && !isLoading ? onPress : null}
      pointerEvents={isEnabled ? "auto" : "none"} // Disable interaction when not enabled
    >
      <View>
        {isLoading ? (
          <ActivityIndicator size="small" color="#F8F8F8" />
        ) : (
          <Text style={[globalStyle.text, s.btnText]}>{btnText}</Text>
        )}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    // flex: 1,
    paddingHorizontal: 8,
    marginTop: 8,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: 60,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: "#6E7880",
    borderColor: "#6E7880",
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
    fontFamily: "Figtree_600SemiBold",
    fontSize: 16,
    color: "#F8F8F8",
  },
});
