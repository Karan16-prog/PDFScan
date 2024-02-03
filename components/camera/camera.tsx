import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";

const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    requestPermission();
    console.log(permission, requestPermission);
  }

  if (!permission?.granted) {
    console.log("test", permission, requestPermission);
  }

  function clickPhoto() {
    console.log("Click Photo");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Camera style={styles.camera} type={CameraType.back}>
        <TouchableOpacity onPress={clickPhoto}>
          <Text>Click</Text>
        </TouchableOpacity>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default CameraScreen;
