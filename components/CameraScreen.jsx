import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View, Button, Linking } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import globalStyle from "../utils/styles";
import CameraPermissions from "./CameraPermissions";

export default function CameraScreen({ onClose, onPictureTaken }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);



  if (!permission?.granted) {
    return <CameraPermissions permission={permission} requestPermission={requestPermission} onClose={onClose}/>;
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onPictureTaken(photo.uri); // Pass image URI to parent
      onClose(); // Close the camera
    }
  }

  return (
    <View style={s.container}>
      <CameraView ref={cameraRef} style={s.camera} facing={"back"}>
        <View style={s.overlayContainer}>
          <View style={s.closeButtonContainer}>
            <TouchableOpacity onPress={onClose} style={s.closeButton}>
              <FontAwesome name="close" size={24} color="#F8F8F8" />
							{/* <Text style={[globalStyle.text, {fontSize: 32, color: '#F8F8F8'}]}>X</Text> */}
            </TouchableOpacity>
          </View>
          <View style={s.captureContainer}>
            <TouchableOpacity style={s.captureButton} onPress={takePicture}>
              <View style={s.captureButtonInner}/>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center'
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
  },
  closeButton: {
		padding: 24,
  },
  captureContainer: {
    alignItems: "center",
		justifyContent: 'center',
  },
	captureButton: {
		height: 75,
		width: 75,
		borderRadius: 100,
		backgroundColor: '#F8F8F8',
		alignItems: "center",
		justifyContent: 'center',
	},
	captureButtonInner: {
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
