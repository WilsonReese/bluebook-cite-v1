import { Pressable, StyleSheet, Text, View } from "react-native";
import globalStyle from "../utils/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function UploadButton({ option, isEnabled, style, onPress }) {
  const iconColor = isEnabled ? '#184EAD' : '#6E7880'
  
  const icons = {
    photo: <FontAwesome name="photo" size={24} color={iconColor} />,
    camera: <FontAwesome name="camera" size={24} color={iconColor} />,
    file: <FontAwesome name="file-pdf-o" size={24} color={iconColor} />,
  };
  const displayedIcon = icons[option] || <Text>?</Text>;

  const textOptions = {
    photo: <Text>Upload Photo</Text>,
    camera: <Text>Take Picture</Text>,
    file: <Text>Upload PDF</Text>,
  };
  const displayedText = textOptions[option] || <Text>?</Text>;

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
      pointerEvents={isEnabled ? "auto" : "none"} // Disable interaction when not enabled
    >
      <View>
        {displayedIcon}
        {/* <Text>{displayedText}</Text> */}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginHorizontal: 4,
    height: 60,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: "#DAE1E5",
    borderColor: "#B8C3CC",
  },
  enabled: {
    backgroundColor: "#F8F8F8",
    borderColor: "#B8C3CC",
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
});
