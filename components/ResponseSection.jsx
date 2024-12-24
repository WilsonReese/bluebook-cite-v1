import {
  Alert,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard"; // Import from expo-clipboard
import globalStyle from "../utils/styles";
import { useState } from "react";
import Markdown from "react-native-markdown-display";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MarkdownIt from "markdown-it";
import RemoveMarkdown from "remove-markdown";

export default function ResponseSection({
  response,
  setResponse,
  showMessage,
  setFileUri,
  setInputText,
  setFileSize,
}) {
  const handleClearResponse = () => {
    setResponse("The generated citation will appear here."); // Clear the response
    showMessage("Reset", "#0C9449");
    setFileUri(null);
    setInputText("");
    setFileSize(null)
    // Alert.alert("Cleared", "The response has been cleared.");
  };

  const handleCopyToClipboard = async () => {
    try {
      if (Platform.OS === "web") {
        // Convert Markdown to HTML
        const markdownToHtml = (markdown) => {
          const md = new MarkdownIt(); // Instantiate markdown-it
          return md.render(markdown);
        };
  
        const htmlContent = markdownToHtml(response);
  
        // Create a temporary HTML element to copy HTML content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
  
        // Use Clipboard API to write both plain text and HTML
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": new Blob([response], { type: "text/plain" }), // Markdown as plain text
            "text/html": new Blob([htmlContent], { type: "text/html" }), // HTML for rich text editors
          }),
        ]);
  
        showMessage("Copied with formatting", "#0C9449");
      } else {
        // Copy plain text for mobile
        const plainText = RemoveMarkdown(response); // Strip Markdown formatting
        await Clipboard.setStringAsync(plainText); // Copy plain text to clipboard
      }
      showMessage("Copied", "#0C9449");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      showMessage("Failed to copy", "#AB1126");
    }
  };

  return (
    <View style={s.container}>
      <View style={s.responseContainer}>
          <Markdown>{response}</Markdown>
        <View style={s.buttonContainer}>
          <TouchableOpacity
            style={[s.button, s.leftButton]}
            onPress={handleClearResponse}
            pointerEvents={'auto'}
          >
            <FontAwesome6 name="arrow-rotate-left" size={20} color="#184EAD" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.button, s.rightButton]}
            onPress={handleCopyToClipboard}
            pointerEvents={'auto'}
          >
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
    alignSelf: "stretch",
  },
  responseContainer: {
    minHeight: 130,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#B8C3CC",
    alignSelf: "stretch",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 8,
    justifyContent: "space-between",
    overflow: "hidden", // Ensures the rounded corners work with ScrollView
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: -8,
  },
  button: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#DAE1E5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  leftButton: {
    borderBottomLeftRadius: 6,
    flex: 1,
  },
  rightButton: {
    borderBottomRightRadius: 6,
    flex: 1,
  },
});

// Copies as Markdown text
// const handleCopyToClipboard = async () => {
//   try {
//     await Clipboard.setStringAsync(response); // Copy the response text
//     Alert.alert("Copied", "The response has been copied to the clipboard.");
//   } catch (error) {
//     Alert.alert("Error", "Failed to copy to clipboard.");
//   }
// };

// // Convert to HTML and copy
// const handleCopyToClipboard = async () => {
//   try {
//     const md = new MarkdownIt(); // Initialize Markdown-It
//     const htmlContent = md.render(response); // Convert Markdown to HTML

//     // Copy HTML content to the clipboard
//     Clipboard.setStringAsync(htmlContent);

//     Alert.alert("Copied", "The formatted response has been copied to the clipboard.");
//   } catch (error) {
//     Alert.alert("Error", "Failed to copy to clipboard.");
//   }
// };

// Convert to RTF and copy

// const markdownToRtf = (markdownContent) => {
//   // Example implementation for basic Markdown to RTF
//   let rtf = "{\\rtf1\\ansi ";
//   const italicRegex = /\*(.*?)\*/g; // Match *text*
//   const boldRegex = /\*\*(.*?)\*\*/g; // Match **text**

//   rtf += markdownContent
//     .replace(italicRegex, "{\\i $1}") // Convert *text* to {\i text}
//     .replace(boldRegex, "{\\b $1}"); // Convert **text** to {\b text}

//   rtf += "}";
//   return rtf;
// };

// const handleCopyToClipboard = async (markdownContent) => {
//   try {
//     const rtfContent = markdownToRtf(markdownContent);

//     // Copy RTF content to clipboard
//     Clipboard.setStringAsync(rtfContent);

//     Alert.alert("Copied", "The formatted content has been copied to the clipboard.");
//   } catch (error) {
//     Alert.alert("Error", "Failed to copy content to clipboard.");
//     console.error("Error copying RTF content:", error);
//   }
// };
