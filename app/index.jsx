import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TextInputField from "../components/TextInputField";
import globalStyle from "../utils/styles";

export default function Index() {
  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={s.safeAreaContainer}>
          <View style={s.titleContainer}>
            <Text style={globalStyle.titleText}>Bluebook Cite</Text>
          </View>
          <View style={s.instructionsContainer}>
            <Text style={globalStyle.text}>
              Instructions: These are the instructions for using the app. And
              this is an example of what to put in. This is an example of the
              response you'll get back.{" "}
            </Text>
          </View>
          <TextInputField/>
          <View style={s.uploadContainer}>
            <View style={s.uploadButtonContainer}>
              <Text>Button to add picture (camera)</Text>
            </View>
            <View style={s.uploadButtonContainer}>
              <Text>Button to add picture (photos)</Text>
            </View>
            <View style={s.uploadButtonContainer}>
              <Text>Button to add file</Text>
            </View>
          </View>
          <View style={s.generateButtonContainer}>
            <Text>Generate citation</Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DAE1E5",
    padding: 8,
  },
  titleContainer: {
    // flex: 1,
    // justifyContent: 'center',
    paddingVertical: 16,
    // backgroundColor: "green",
  },
  instructionsContainer: {
    // flex: 1,
    // justifyContent: 'center',
    paddingVertical: 16,
    // backgroundColor: "blue",
  },
  uploadContainer: {
    flexDirection: "row",
    backgroundColor: "yellow",
    justifyContent: "center",
    paddingVertical: 16,
  },
  uploadButtonContainer: {
    flex: 1,
    backgroundColor: "pink",
    paddingHorizontal: 8,
    alignItems: "center",
  },
  generateButtonContainer: {
    paddingVertical: 16,
    backgroundColor: "red",
  },
});
