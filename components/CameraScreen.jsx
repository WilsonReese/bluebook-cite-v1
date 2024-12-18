import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import globalStyle from "../utils/styles";

export default function CameraScreen({ onClose, onPictureTaken }) {
  // const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function takePicture() {
    // Capture picture logic (optional: you can use expo-image-manipulator here)
    const mockUri = "path/to/captured/image.jpg"; // Mock URI; replace with actual captured image
    onPictureTaken(mockUri);
  }

  return (
    <View style={s.container}>
      <CameraView style={s.camera} facing={"back"}>
        <View style={s.overlayContainer}>
          <View style={s.closeButtonContainer}>
            <TouchableOpacity>
              <FontAwesome name="close" size={32} color="#F8F8F8" />
							{/* <Text style={[globalStyle.text, {fontSize: 32, color: '#F8F8F8'}]}>X</Text> */}
            </TouchableOpacity>
          </View>
          <View style={s.captureContainer}>
            <TouchableOpacity style={s.captureButtonBackground}>
              <View style={s.captureButton}/>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={s.buttonContainer}>
          <TouchableOpacity style={s.button} onPress={toggleCameraFacing}>
            <Text style={s.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button} onPress={takePicture}>
            <Text style={s.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.button} onPress={onClose}>
            <Text style={s.text}>Close Camera</Text>
          </TouchableOpacity>
        </View> */}
      </CameraView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 40,
  },
  closeButtonContainer: {
    alignItems: "flex-end",
		padding: 16,
  },
  captureContainer: {
    alignItems: "center",
		justifyContent: 'center',
  },
	captureButtonBackground: {
		height: 75,
		width: 75,
		borderRadius: 100,
		backgroundColor: '#F8F8F8',
		alignItems: "center",
		justifyContent: 'center',
	},
	captureButton: {
		height: 70,
		width: 70,
		borderRadius: 100,
		backgroundColor: '#F8F8F8',
		borderWidth: 2,
	},
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 16,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});
