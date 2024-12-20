import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { handleGenerateCitation } from "../utils/api";
import TextInputField from "../components/TextInputField";
import UploadButton from "../components/UploadButton";
import GenerateButton from "../components/GenerateButton";
import CameraScreen from "../components/CameraScreen";
import {
  getFileName,
  handleSelectFile,
  handleSelectPhoto,
} from "../utils/fileHandlers";
import Markdown from "react-native-markdown-display";
import globalStyle from "../utils/styles";
import ResponseSection from "../components/ResponseSection";

export default function Index() {
  const [inputText, setInputText] = useState(""); // State to store input
  const [response, setResponse] = useState("The generated citation will appear here."); // State to store API response
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
    return  <CameraScreen onPictureTaken={handleCapture} onClose={closeCamera} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={s.safeAreaContainer}>
          <View style={s.titleContainer}>
            <Text style={[globalStyle.titleText, {paddingBottom: 16}]}>Bluebook Citations.</Text>
            <View style={s.divider}/>
          </View>
          {/* <View style={s.instructionsContainer}>
            <Text style={globalStyle.text}>
              Instructions: These are the instructions for using the app. And
              this is an example of what to put in. This is an example of the
              response you'll get back.{" "}
            </Text>
          </View> */}
          <ResponseSection response={response} setResponse={setResponse}/>
          <View style={s.divider}/>
          
          <Text style={[globalStyle.text, {paddingVertical: 8}]}>Enter book details</Text>
          <TextInputField onTextChange={setInputText} />
          <Text style={[globalStyle.text, {paddingVertical: 8}]}>Or upload an image of the cover</Text>
          <View style={s.uploadContainer}>
            <UploadButton
              option={"camera"}
              isEnabled={true}
              onPress={openCamera}
            />
            <UploadButton
              option={"photo"}
              isEnabled={true}
              onPress={() => handleSelectPhoto(setFileUri)}
            />
            {/* <UploadButton
              option={"file"}
              isEnabled={true}
              onPress={() => handleSelectFile(setFileUri)}
            /> */}
          </View>
          <View style={s.fileNameContainer}>
            <Text style={globalStyle.text}>{getFileName(fileUri)}</Text>
          </View>
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
    paddingTop: 16,
    // paddingBottom: 4,
  },
  divider: {
    height: 3,
    width: 160,
    backgroundColor: "#184EAD",
    // marginTop: 16,
    alignSelf: "center",
  },
  instructionsContainer: {
    paddingVertical: 16,
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: -4,
    // paddingVertical: 16,
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
