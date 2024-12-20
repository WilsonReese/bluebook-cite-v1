import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker
import { useState } from "react";
import globalStyle from "../utils/styles";
import { handleGenerateCitation } from "../utils/api";
import TextInputField from "../components/TextInputField";
import UploadButton from "../components/UploadButton";
import GenerateButton from "../components/GenerateButton";
import CameraScreen from "../components/CameraScreen";
import { getFileName, handleSelectFile, handleSelectPhoto } from "../utils/fileHandlers";

export default function Index() {
  const [inputText, setInputText] = useState(""); // State to store input
  const [response, setResponse] = useState("Response Placeholder"); // State to store API response
  const [fileUri, setFileUri] = useState(null); // Handles both images and files
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  const handleCapture = (uri) => {
    setFileUri(uri);
    closeCamera();
  };

  const handleGenerate = () => {
    console.log("handleGenerate invoked");
    console.log("Input Text:", inputText);
    console.log("File URI:", fileUri);
  
    if (fileUri) {
      const isPDF = fileUri.toLowerCase().endsWith(".pdf"); // Check if the file is a PDF
      console.log("Is PDF:", isPDF);
  
      handleGenerateCitation(fileUri, setResponse, true, isPDF); // Pass `isPDF` flag
    } else {
      handleGenerateCitation(inputText, setResponse, false); // Text input
    }
  };

  if (isCameraOpen) {
    return <CameraScreen onPictureTaken={handleCapture} onClose={closeCamera} />;
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
            <UploadButton option={"photo"} isEnabled={true} onPress={() => handleSelectPhoto(setFileUri)} />
            <UploadButton option={"file"} isEnabled={true} onPress={() => handleSelectFile(setFileUri)} />
          </View>
          <View style={s.fileNameContainer}>
            <Text>{getFileName(fileUri)}</Text>
          </View>
          <Text style={globalStyle.text}>File name placeholder</Text>
          <GenerateButton
            btnText={"Generate Citation"}
            isEnabled={true}
            onPress={handleGenerate}
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
  fileNameContainer: {
    // flex: 1,
    padding: 8,
    // backgroundColor: "#f0f0f0",
  },
});
