import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [file, setFiles] = useState<string[]>([]);

  let photoDir = FileSystem.documentDirectory + "photos/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(photoDir);
    if (!dirInfo.exists) {
      console.log("Directory doesnt exist");
      try {
        await FileSystem.makeDirectoryAsync(photoDir, { intermediates: true });
      } catch (error) {
        console.log("Could Not Make Directory", error);
      }
    }
  };

  const loadPhotos = async () => {
    try {
      await ensureDirExists();
      const fileList = await FileSystem.readDirectoryAsync(photoDir);
      //  console.log(fileList);
      setFiles(
        fileList.map(
          (fileName) => FileSystem.documentDirectory + "photos/" + fileName
        )
      );

      //     setFiles(photoList.map((fileName) => photoDir + fileName));
    } catch (error) {
      console.error("Error loading photos", error);
      // alert here
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <Text>Go To Camera</Text>
        </TouchableOpacity>
        <FlatList
          data={file}
          renderItem={() => <RenderPhotoItem />}
          keyExtractor={(item) => item}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// Procrastinated the whole day again
//

const RenderPhotoItem = () => {
  return (
    <View>
      {/* <TouchableOpacity onPress={() => deletePhoto(item)}> */}
      {/* <Image source={{ uri: "item" }} style={{ width: 100, height: 100 }} /> */}
      {/* </TouchableOpacity> */}
      {/* <TouchableOpacity
        onPress={() => exportToMemory(item)}
        style={{ marginLeft: 10 }}
      >
        <Button title="Export" onPress={() => exportToMemory(item)} />
      </TouchableOpacity> */}
    </View>
  );
};
