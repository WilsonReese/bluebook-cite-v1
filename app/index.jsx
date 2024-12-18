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
import axios from "axios";

export default function Index() {
  const [inputText, setInputText] = useState(""); // State to store input
  const [response, setResponse] = useState("Response Placeholder"); // State to store API response

  async function handleGenerateCitation() {
    if (!inputText.trim()) {
      setResponse("Please enter text to generate a citation.");
      return;
    }

    try {
      // Step 1: Create the thread
      const threadRes = await axios.post(
        "https://api.openai.com/v1/threads",
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      const threadId = threadRes.data.id;
      console.log("ThreadID", threadId);

      // Step 2: Send content
      await axios.post(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        { role: "user", content: inputText },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      console.log("Step 2 complete");

      // Step 3: Engage Assitant API
      const runRes = await axios.post(
        `https://api.openai.com/v1/threads/${threadId}/runs`,
        { assistant_id: `${process.env.EXPO_PUBLIC_ASSISTANT_ID}` },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      console.log("Step 3 complete");


    // Step 4: Poll for the response
    let assistantMessage;
    while (true) {
      const messagesRes = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_SECRET_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      const messages = messagesRes.data.data;
      console.log("Messages", messages);

      assistantMessage = messages.find(
        (msg) => msg.role === "assistant" && msg.content?.length > 0
      );

      if (assistantMessage) break;

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    console.log("Step 4 complete");

    // Step 5: Extract the assistant's response
    const contentText = assistantMessage.content.find(
      (item) => item.type === "text"
    );

    const citation = contentText?.text?.value || "No citation found.";
    console.log("Citation:", citation);
    setResponse(citation);
    } catch (error) {
      console.error("Error generating citation:", error);
      setResponse("Failed to generate citation. Please try again.");
    }
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
          <TextInputField onTextChange={setInputText} />
          <View style={s.uploadContainer}>
            <UploadButton option={"camera"} isEnabled={true} />
            <UploadButton option={"photo"} isEnabled={true} />
            <UploadButton option={"file"} isEnabled={true} />
          </View>
          <GenerateButton
            btnText={"Generate Citation"}
            isEnabled={true}
            onPress={handleGenerateCitation}
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
