import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyle from "../utils/styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CameraPermissions({ permission, requestPermission, onClose }) {
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Show instructions if permission is denied
    if (permission.canAskAgain) {
      return (
        <View style={s.container}>
          <TouchableOpacity style={s.arrowContainer} onPress={onClose}>
            <FontAwesome name="arrow-left" size={24} color="#F8F8F8" />
          </TouchableOpacity>
          <View style={s.contentContainer}>
            <Text style={[globalStyle.text, s.message]}>
              We need your permission to access the camera.
            </Text>
            <TouchableOpacity style={s.btn} onPress={requestPermission}>
              <Text style={[globalStyle.text, s.btnText]}>
                Grant Permission
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      // Permission denied and cannot ask again; redirect to settings
      return (
        <View style={s.container}>
          <TouchableOpacity style={s.arrowContainer} onPress={onClose}>
            <FontAwesome name="arrow-left" size={24} color="#F8F8F8" />
          </TouchableOpacity>
          <View style={s.contentContainer}>
            <Text style={[globalStyle.text, s.message]}>
              Camera access is denied. Please enable it in your device settings.
            </Text>
            <TouchableOpacity
              style={s.btn}
              onPress={() => Linking.openSettings()}
            >
              <Text style={[globalStyle.text, s.btnText]}>Open Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  return null; // No UI when permission is granted
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02080D'
  },
  arrowContainer: {
    padding: 16,
    flex: 0.5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  message: {
    textAlign: "center",
    marginBottom: 10,
    color: '#F8F8F8'
  },
  btn: {
    backgroundColor: "#184EAD",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnText: {
    fontFamily: "Figtree_600SemiBold",
    color: "#F8F8F8",
    fontSize: 16,
  },
});
