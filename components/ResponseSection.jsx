import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyle from "../utils/styles";
import { useState } from "react";
import Markdown from "react-native-markdown-display";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ResponseSection({ response, setResponse }) {
  const handleClearResponse = () => {
    setResponse("The generated citation will appear here."); // Clear the response
    Alert.alert("Cleared", "The response has been cleared.");
  };

  const handleCopyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(response); // Copy the response text
      Alert.alert("Copied", "The response has been copied to the clipboard.");
    } catch (error) {
      Alert.alert("Error", "Failed to copy to clipboard.");
    }
  };

  return (
    <View style={s.container}>
      <View style={s.responseContainer}>
        <Markdown>{response}</Markdown>
        <View style={s.buttonContainer}>
          <TouchableOpacity style={[s.button, s.leftButton]} onPress={handleClearResponse}>
            <FontAwesome6 name="arrow-rotate-left" size={20} color="#184EAD" />
          </TouchableOpacity>
          <TouchableOpacity style={[s.button, s.rightButton]} onPress={handleCopyToClipboard}>
            <FontAwesome6 name="clipboard" size={20} color="#184EAD" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignSelf:'stretch'
  },
  responseContainer: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#B8C3CC",
    alignSelf: "stretch",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: -8,
  },
  button: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#DAE1E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    borderBottomLeftRadius: 6,
    flex: 1,
  },
  rightButton: {
    borderBottomRightRadius: 6,
    flex: 1
  }
});
