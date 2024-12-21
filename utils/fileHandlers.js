import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export const handleSelectPhoto = async (setFileUri) => {
  try {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      const { status: requestStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (requestStatus !== "granted") {
        alert(
          "Permission to access photos is required. You can update this in Settings."
        );
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setFileUri(result.assets[0].uri);
    }
  } catch (error) {
    console.error("Error selecting photo:", error);
  }
};

export const handleSelectFile = async (setFileUri) => {
  try {
    console.log("Opening file picker...");
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"], // Allow images and PDFs
      copyToCacheDirectory: true,
    });

    console.log("File picker result:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0]; // Access the first selected file
      console.log("Selected file URI:", file.uri);
      setFileUri(file.uri); // Set the file URI to state
    } else {
      console.log("File selection was canceled or invalid.");
    }
  } catch (error) {
    console.error("Error selecting file:", error);
  }
};

export const getFileName = (fileUri) => {
  if (!fileUri) return "No file selected";
  const fileName = fileUri.split("/").pop();
  const extension = fileName.split(".").pop().toUpperCase(); // Extract and capitalize the extension
  return `${extension} uploaded`;
};