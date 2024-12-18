import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TextInputField from "../components/TextInputField";
import globalStyle from "../utils/styles";
import UploadButton from "../components/UploadButton";
import GenerateButton from "../components/GenerateButton";
import { useState } from "react";
import { handleGenerateCitation } from "../utils/api";
import CameraScreen from "../components/CameraScreen";

export default function Index() {
  const [inputText, setInputText] = useState(""); // State to store input
  const [response, setResponse] = useState("Response Placeholder"); // State to store API response
  const [imageUri, setImageUri] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  const handleCapture = (uri) => {
    setImageUri(uri);
    closeCamera();
  };

  const handleGenerate = () => {
    if (imageUri) {
      handleGenerateCitation(`Image: ${imageUri}`, setResponse);
    } else {
      handleGenerateCitation(inputText, setResponse);
    }
  };

  if (isCameraOpen) {
    return <CameraScreen onCapture={handleCapture} onClose={closeCamera} />;
  }

  return (
    <SafeAreaProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={s.safeAreaContainer}>
          <View style={s.titleContainer}>
            <Text style={globalStyle.titleText}>
              Bluebook Citation Generator
            </Text>
          </View>
          <View style={s.instructionsContainer}>
            <Text style={globalStyle.text}>
              Instructions: These are the instructions for using the app. And
              this is an example of what to put in. This is an example of the
              response you'll get back.{" "}
            </Text>
          </View>
          <View style={s.responseContainer}>
            <Text>{response}</Text>
          </View>
          <Text style={globalStyle.text}>Enter book details</Text>
          <TextInputField onTextChange={setInputText} />
          <Text style={globalStyle.text}>Or upload an image of the cover</Text>
          <View style={s.uploadContainer}>
            <UploadButton option={"camera"} isEnabled={true} onPress={openCamera} />
            <UploadButton option={"photo"} isEnabled={true} />
            <UploadButton option={"file"} isEnabled={true} />
          </View>
          <GenerateButton
            btnText={"Generate Citation"}
            isEnabled={true}
            onPress={() => handleGenerateCitation(inputText, setResponse)}
          />
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
  responseContainer: {
    height: 60,
    justifyContent: "center",
    borderWidth: 1,
    alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 16,
    // flexDirection: 'row',
    // flex: 1,
    // backgroundColor: 'blue'
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: -4,
    paddingVertical: 16,
    // width: '100%',
  },
  generateButtonContainer: {
    paddingVertical: 16,
    backgroundColor: "red",
  },
});
