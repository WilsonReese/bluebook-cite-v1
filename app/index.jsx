import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TextInputField from "../components/TextInputField";
import globalStyle from "../utils/styles";
import UploadButton from "../components/UploadButton";


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
            <UploadButton icon={'camera'}/>
            <UploadButton icon={'photo'}/>
            <UploadButton icon={'file'}/>
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
    alignItems: "center",
    backgroundColor: "#DAE1E5",
    padding: 8,
  },
  titleContainer: {
    paddingVertical: 16,
  },
  instructionsContainer: {
    paddingVertical: 16,
  },
  uploadContainer: {
    flexDirection: "row",
    backgroundColor: "yellow",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
    // width: '100%',
  },
  generateButtonContainer: {
    paddingVertical: 16,
    backgroundColor: "red",
  },
});
