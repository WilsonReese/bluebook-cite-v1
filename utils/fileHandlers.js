import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";
// import * as FileSystem from "expo-file-system";

export const handleSelectPhoto = async (setFileUri, setFileSize) => {
  try {
    if (Platform.OS === "web") {
      // Web-specific file picker logic
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const fileSize = file.size; // File size in bytes
          console.log("Selected file size:", fileSize);

          // Limit file size to 1 MB (1 MB = 1048576 bytes)
          if (fileSize > 1048576) {
            alert("File size exceeds 1 MB. Please select a smaller file.");
            return;
          }

          const blob = await file.arrayBuffer();
          const fileUri = URL.createObjectURL(new Blob([blob], { type: file.type }));
          setFileUri({ uri: fileUri, name: file.name, type: file.type });
          setFileSize((fileSize / 1024).toFixed(2)); // Set file size in KB
        }
      };
      input.click();
    } else {
      // Mobile-specific logic
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
        const uri = result.assets[0].uri;

        // Get file size on mobile
        const info = await FileSystem.getInfoAsync(uri);
        const fileSize = info.size; // File size in bytes
        console.log("Selected file size:", fileSize);

        // Limit file size to 1 MB
        // if (fileSize > 3145728) {
        //   alert("File size exceeds 3 MB. Please select a smaller file.");
        //   return;
        // }

        setFileUri(uri);
        setFileSize((fileSize / 1024).toFixed(2)); // Set file size in KB
      }
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

  // Handle web file objects
  if (typeof fileUri === "object" && fileUri.name) {
    return fileUri.name; // Return the name property for web files
  }

  // Handle mobile URIs
  const fileName = fileUri.split("/").pop(); // Extract the file name from the path
  return fileName;
};