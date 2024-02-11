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
import { CameraCapturedPicture } from "expo-camera";
import CheckMark from "../../assets/svg/check";

const CameraScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState<CameraCapturedPicture[]>([]);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef?.takePictureAsync();
        //  console.log(data);
        setImage([...image, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePictureToLocalDir = async () => {
    let dirName = getCurrentDateTimeString();
    let photoDir = FileSystem.documentDirectory + `photos/${dirName}/`;
    console.log(photoDir);
    try {
      await FileSystem.makeDirectoryAsync(photoDir, { intermediates: true });

      for (let i = 0; i < image.length; i++) {
        let img = image[i];
        await FileSystem.copyAsync({
          from: img.uri,
          to: photoDir + i + ".jpg",
        });
      }
      setImage([]);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error(error);
    }
  };

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
        ></Camera>
      </View>
      <View style={styles.buttonContainer}>
        <View></View>
        <TouchableOpacity
          style={styles.clickBtn}
          onPress={takePicture}
        ></TouchableOpacity>
        {image.length > 0 ? (
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={savePictureToLocalDir}
          >
            <CheckMark />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101820",
    justifyContent: "center",
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
  },
  cameraContainer: {
    flex: 0.6,
  },
  camera: {
    flex: 1,
  },
  clickBtn: {
    height: 50,
    width: 50,
    backgroundColor: "#FEE715",
    borderRadius: 100,
  },
  saveBtn: {
    padding: 5,
    backgroundColor: "white",
  },
});

export default CameraScreen;
