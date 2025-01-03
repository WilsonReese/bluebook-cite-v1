import {
  Keyboard,
  Platform,
  Pressable,
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
import { useCallback, useState } from "react";

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
import { Message } from "../components/Message";

export default function Index() {
  const [inputText, setInputText] = useState(""); // State to store input
  const [response, setResponse] = useState(
    "The generated citation will appear here."
  ); // State to store API response
  const [fileUri, setFileUri] = useState(null); // Handles both images and files
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileSize, setFileSize] = useState(null); // Add file size state

  const showMessage = (text, color) => {
    setMessage({ text, color });
  };

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  const handleCapture = (uri) => {
    setFileUri(uri);
    closeCamera();
  };

  const handleGenerate = async () => {
    console.log("handleGenerate invoked");
    console.log("Input Text:", inputText);
    console.log("File URI:", fileUri);

    setIsLoading(true); // Set loading to true when the function starts

    try {
      if (fileUri) {
        let isPDF = false;

        // Check if fileUri is a string or object
        if (typeof fileUri === "string") {
          isPDF = fileUri.toLowerCase().endsWith(".pdf");
        } else if (fileUri?.name) {
          isPDF = fileUri.name.toLowerCase().endsWith(".pdf");
        }

        console.log("Is PDF:", isPDF);

        // Pass the fileUri object or string to the API
        await handleGenerateCitation(fileUri, setResponse, true, isPDF);
      } else {
        await handleGenerateCitation(inputText, setResponse, false); // Handle text input
      }
    } catch (error) {
      console.error("Error generating citation:", error);
    } finally {
      setIsLoading(false); // Reset loading to false after the API call completes
    }
  };

  if (isCameraOpen) {
    return (
      <CameraScreen onPictureTaken={handleCapture} onClose={closeCamera} />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Pressable
        style={[s.pressable, Platform.OS === "web" && { cursor: "default" }]}
        onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
        pointerEvents="box-none"
      >
        <SafeAreaView style={s.safeAreaContainer}>
          <View style={s.contentWrapper}>
            {message && (
              <Message
                message={message.text}
                color={message.color}
                onHide={() => setMessage(null)} // Hide message after duration
              />
            )}
            <View style={s.titleContainer}>
              <Text style={[globalStyle.titleText]}>Bluebook Citations</Text>
              {/* <View style={s.divider}/> */}
            </View>
            {/* <View style={s.instructionsContainer}>
            <Text style={globalStyle.text}>
              Instructions: These are the instructions for using the app. And
              this is an example of what to put in. This is an example of the
              response you'll get back.{" "}
            </Text>
          </View> */}
            <ResponseSection
              response={response}
              setResponse={setResponse}
              showMessage={showMessage}
              setFileUri={setFileUri}
              setInputText={setInputText}
              setFileSize={setFileSize}
            />
            {/* <View style={s.divider}/> */}
            <View style={s.sourceContainer}>
              <View style={s.sourceHeaderContainer}>
              <Text style={globalStyle.headerText}>Source Information</Text>
              </View>
              <Text
                style={[
                  globalStyle.text,
                  { paddingBottom: 4, alignSelf: "flex-start" },
                ]}
              >
                Enter details:
              </Text>
              <TextInputField
                onTextChange={setInputText}
                value={inputText}
                isEnabled={!fileUri}
                onSubmit={handleGenerate}
              />
              <Text
                style={[
                  globalStyle.text,
                  { paddingTop: 8, paddingBottom: 4, alignSelf: "flex-start" },
                ]}
              >
                Or upload an image of the title page:
              </Text>
              <View style={s.uploadContainer}>
                <UploadButton
                  option={"camera"}
                  isEnabled={!inputText.trim()}
                  onPress={openCamera}
                />
                <UploadButton
                  option={"photo"}
                  isEnabled={!inputText.trim()}
                  onPress={() => handleSelectPhoto(setFileUri, setFileSize)}
                />
                {/* <UploadButton
              option={"file"}
              isEnabled={!inputText.trim()}
              onPress={() => handleSelectFile(setFileUri)}
            /> */}
              </View>
              {/* <View style={s.fileNameContainer}>
              <Text style={globalStyle.text}>{getFileName(fileUri)}</Text>
            </View> */}
              <View style={s.fileNameContainer}>
                <Text style={globalStyle.text}>
                  {fileUri
                    ? fileSize !== null
                      ? `${getFileName(fileUri)} (${fileSize} KB)`
                      : getFileName(fileUri) // Only display the file name if size is null
                    : "No file selected"}
                </Text>
              </View>
            </View>
            <GenerateButton
              btnText={"Generate Citation"}
              isEnabled={(inputText.trim() !== "" || fileUri) && !isLoading}
              onPress={handleGenerate}
              isLoading={isLoading} // Pass loading state to show spinner
            />
          </View>
        </SafeAreaView>
      </Pressable>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#DAE1E5",
    // alignItems: "center",
    // padding: 8,
  },
  contentWrapper: {
    alignItems: "center",
    width: "100%",
    padding: 8,
    flex: 1,
    ...(Platform.OS === "web" && {
      maxWidth: 800, // Limit width for web
      marginHorizontal: "auto", // Center horizontally on web
      paddingHorizontal: 16, // Add padding on web
    }),
  },
  titleContainer: {
    paddingTop: 8,
    // width: 1000
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
  sourceContainer: {
    // backgroundColor: 'green',
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: '#B8C3CC',
    alignSelf: 'stretch',
    paddingVertical: 8,
  },
  sourceHeaderContainer: {
    alignItems: 'center',
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: -4,
    alignSelf: "stretch",
    // paddingVertical: 16,
    // width: '100%',
  },
  fileNameContainer: {
    // flex: 1,
    padding: 8,
    alignItems: 'center'
    // backgroundColor: "#f0f0f0",
  },
});
