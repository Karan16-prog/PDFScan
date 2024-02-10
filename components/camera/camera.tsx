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
import { NavigationProp } from "@react-navigation/native";
import { getCurrentDateTimeString } from "../../func";
import * as FileSystem from "expo-file-system";

const CameraScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState<string[]>([]);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef?.takePictureAsync();
        //  console.log(data);
        setImage([...image, data.uri]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePictureToLocalDir = async () => {
    let dirName = getCurrentDateTimeString();
    console.log(dirName);
    let photoDir = FileSystem.documentDirectory + `photos/${dirName}`;
    await FileSystem.makeDirectoryAsync(photoDir, { intermediates: true });
    // await FileSystem.makeDirectoryAsync(photoDir, { intermediates: true });
    // await FileSystem.copyAsync({
    //   from: photo.uri,
    //   to: FileSystem.documentDirectory + "photos/photo_" + Date.now() + ".jpg",
    // });
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

  // function clickPhoto() {
  //   console.log("Click Photo");
  // }

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
          <TouchableOpacity onPress={takePicture}>
            <Text>Click</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={savePictureToLocalDir}>
            <Text>Save</Text>
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
