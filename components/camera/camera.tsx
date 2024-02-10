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
import { useState, useRef } from "react";

const CameraScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState<string[]>([]);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef?.takePictureAsync();
        console.log(data);
        setImage([...image, data.uri]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const savePicture = async () => {
  //   if (image.length) {
  //     try {
  //       const asset = await
  //     }
  //   }
  // }

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
      <View style={styles.cameraContainer}>
        <Camera
          ratio="9:16"
          style={styles.camera}
          ref={(ref: Camera) => setCameraRef(ref)}
          type={CameraType.back}
        >
          <TouchableOpacity onPress={clickPhoto}>
            <Text>Click</Text>
          </TouchableOpacity>
        </Camera>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 0.6,
  },
  camera: {
    flex: 1,
  },
});

export default CameraScreen;
